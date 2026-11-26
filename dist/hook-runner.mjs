import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);
import{readFileSync as N}from"node:fs";import{mkdirSync as l}from"node:fs";import{homedir as E}from"node:os";import{join as u}from"node:path";import{DatabaseSync as p}from"node:sqlite";function c(t){let e=t||process.env.PLUGIN_DATA||process.env.TOKPULSE_DATA_DIR||u(E(),".gemini","antigravity","plugin_data","tokpulse");return l(e,{recursive:!0}),e}function _(t){l(t,{recursive:!0});let e=u(t,"tokpulse.db"),n=new p(e);return n.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA busy_timeout = 3000;

    CREATE TABLE IF NOT EXISTS hook_sessions (
      conversation_id TEXT PRIMARY KEY,
      workspace TEXT,
      model_name TEXT,
      started_at_ms INTEGER NOT NULL,
      last_seen_at_ms INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS hook_invocations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id TEXT NOT NULL,
      invocation_num INTEGER,
      model_name TEXT,
      workspace TEXT,
      started_at_ms INTEGER NOT NULL,
      model_ended_at_ms INTEGER,
      ended_at_ms INTEGER,
      model_duration_ms INTEGER,
      total_duration_ms INTEGER,
      termination_reason TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_inv_conv_time ON hook_invocations(conversation_id, started_at_ms DESC);

    CREATE TABLE IF NOT EXISTS hook_tools (
      tool_call_id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      tool_name TEXT NOT NULL,
      step_idx INTEGER,
      started_at_ms INTEGER NOT NULL,
      ended_at_ms INTEGER,
      duration_ms INTEGER,
      error TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_tools_name ON hook_tools(tool_name);
    CREATE INDEX IF NOT EXISTS idx_tools_conv ON hook_tools(conversation_id);

    CREATE TABLE IF NOT EXISTS transcript_cache (
      conversation_id TEXT PRIMARY KEY,
      file_path TEXT NOT NULL,
      mtime_ms REAL NOT NULL,
      size_bytes INTEGER NOT NULL,
      parsed_json TEXT NOT NULL,
      parsed_at_ms INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS preferences (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS license_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      license_key TEXT,
      status TEXT NOT NULL DEFAULT 'inactive',
      provider TEXT NOT NULL DEFAULT 'lemonsqueezy',
      instance_id TEXT,
      activated_at_ms INTEGER,
      verified_at_ms INTEGER
    );
  `),n}function R(){let t="";try{t=N(0,"utf8")}catch{process.stdout.write("{}");return}if(!t.trim()){process.stdout.write("{}");return}try{let e=JSON.parse(t),n=e.hookEventName||"",r=e.conversationId||"";if(!n||!r){process.stdout.write("{}");return}let o=Date.now(),d=Array.isArray(e.workspacePaths)&&e.workspacePaths[0]?String(e.workspacePaths[0]):null,T=e.modelName?String(e.modelName):null,m=c(),a=_(m);try{if(a.prepare(`
        INSERT INTO hook_sessions (conversation_id, workspace, model_name, started_at_ms, last_seen_at_ms)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(conversation_id) DO UPDATE SET
          workspace = COALESCE(excluded.workspace, hook_sessions.workspace),
          model_name = COALESCE(excluded.model_name, hook_sessions.model_name),
          last_seen_at_ms = excluded.last_seen_at_ms
      `).run(r,d,T,o,o),n==="PreInvocation")a.prepare(`
          INSERT INTO hook_invocations (conversation_id, invocation_num, model_name, workspace, started_at_ms)
          VALUES (?, ?, ?, ?, ?)
        `).run(r,typeof e.invocationNum=="number"?e.invocationNum:null,T,d,o);else if(n==="PostToolUse"){let s=e.toolCall?.id||`${r}:${e.stepIdx??o}`,i=e.toolCall?.name||"unknown";a.prepare(`
          INSERT INTO hook_tools (tool_call_id, conversation_id, tool_name, step_idx, started_at_ms, ended_at_ms, duration_ms, error)
          VALUES (?, ?, ?, ?, ?, ?, NULL, ?)
          ON CONFLICT(tool_call_id) DO UPDATE SET
            ended_at_ms = excluded.ended_at_ms,
            error = excluded.error
        `).run(s,r,i,e.stepIdx??null,o,o,e.error||null)}else if(n==="PostInvocation"||n==="Stop"){let s=a.prepare("SELECT id, started_at_ms, model_ended_at_ms FROM hook_invocations WHERE conversation_id = ? AND ended_at_ms IS NULL ORDER BY id DESC LIMIT 1").get(r);if(s){let i=s.model_ended_at_ms??o;a.prepare(`
            UPDATE hook_invocations
            SET model_ended_at_ms = ?,
                model_duration_ms = ?,
                ended_at_ms = ?,
                total_duration_ms = ?,
                termination_reason = COALESCE(?, termination_reason)
            WHERE id = ?
          `).run(i,Math.max(0,i-s.started_at_ms),o,Math.max(0,o-s.started_at_ms),e.terminationReason||null,s.id)}}}finally{a.close()}}catch{}process.stdout.write("{}")}R();
