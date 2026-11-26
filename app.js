(function () {
  const cfg = window.TOKPULSE_SITE_CONFIG || {};
  const repo = cfg.repository || 'https://github.com/jellygor-studio/tokpulse';
  const checkoutUrls = cfg.checkoutUrls || {};
  const monthlyUrl = checkoutUrls.monthly || cfg.checkoutUrl || '#pricing';
  const yearlyUrl = checkoutUrls.yearly || cfg.checkoutUrl || '#pricing';
  const lifetimeUrl = checkoutUrls.lifetime || cfg.checkoutUrl || '#pricing';
  const monthlyUsd = cfg.pricing?.monthlyUsd ?? 1.99;
  const yearlyUsd = cfg.pricing?.yearlyUsd ?? 9.99;
  const earlyUsd = cfg.pricing?.earlyBirdUsd ?? 10.99;
  const regUsd = cfg.pricing?.regularUsd ?? 12.99;

  // Bind config URLs & pricing
  const installCmd = `agy plugin install ${repo}`;
  const installEl = document.getElementById('installCmd');
  if (installEl) installEl.textContent = installCmd;

  const ghLink = document.getElementById('githubLink');
  if (ghLink) ghLink.href = repo;
  const footerRepo = document.getElementById('footerRepo');
  if (footerRepo) footerRepo.href = repo;
  const footerAuthor = document.getElementById('footerAuthor');
  if (footerAuthor && cfg.author?.name) footerAuthor.textContent = cfg.author.name;

  const proBtn = document.getElementById('proCheckoutBtn');
  if (proBtn) proBtn.href = lifetimeUrl;
  const proSubBtn = document.getElementById('proSubCheckoutBtn');
  if (proSubBtn) proSubBtn.href = yearlyUrl;
  const proPriceNum = document.getElementById('proPriceNum');
  if (proPriceNum) proPriceNum.textContent = `$${earlyUsd}`;
  const proRegularNum = document.getElementById('proRegularNum');
  if (proRegularNum) proRegularNum.textContent = `$${regUsd}`;

  let subCycle = 'yearly';

  // Bilingual copy (auto-detects browser language)
  const COPY = {
    en: {
      'nav.features': 'Features',
      'nav.pricing': 'Pricing',
      'nav.faq': 'FAQ',
      'nav.getPro': 'Get Pro',
      'hero.badge': 'Built natively as an MCP App for Antigravity v2.34+',
      'hero.title': 'See every token, speed burst, and dollar your prompt cache saves.',
      'hero.sub': 'Real-time tok/s speed, exact cache hit rate, prefix cache-drop diagnostics, and per-project cost billing — 100% local, zero debugger flags, survives every host upgrade.',
      'hero.copy': 'Copy',
      'hero.copied': 'Copied',
      'hero.ctaPro': `Unlock Pro — $${earlyUsd} Early Bird`,
      'hero.ctaGithub': 'View on GitHub',
      'demo.tabLive': 'Live Speed',
      'demo.tabBilling': 'Project Billing',
      'demo.tabDiag': 'Cache Diagnostics',
      'demo.scope': 'All Sessions · Hooks Live',
      'demo.latestSpeed': 'Global Latest Speed',
      'demo.avg': 'Global Avg',
      'demo.turn': 'Turn Time',
      'demo.peak': 'Global Peak',
      'demo.savingsTitle': 'Prompt Cache Impact',
      'demo.hitTag': '91.5% Hit',
      'demo.savingsSub': 'Estimated API input cost saved via prefix caching',
      'demo.cacheRead': 'Cache Read',
      'demo.uncached': 'Uncached',
      'demo.output': 'Output',
      'demo.billingHead': 'Project Cost Breakdown (30d)',
      'demo.colProj': 'Project',
      'demo.colTokens': 'Tokens',
      'demo.colHit': 'Cache Hit',
      'demo.colEst': 'Est. Cost',
      'demo.colSaved': 'Saved',
      'demo.diagHead': 'Session Efficiency & Cache-Drop Audit',
      'demo.diagDrop': '1 Cache Drop Found',
      'demo.diagTip1': 'Step #42: Prefix cache dropped 91% (142K → 12K) after switching mid-thread, adding +$0.24 uncached input.',
      'demo.diagTip2': 'Context window is at 68% — consider running /compact before the next refactor phase.',
      'feat.heading': 'Engineered not to break on every host update.',
      'feat.1.title': '100% Official MCP App Architecture',
      'feat.1.desc': 'No remote-debugging port, no Electron DOM injection, and zero host file patching. Opens natively in the side pane, left sidebar full view, or inline in chat.',
      'feat.2.title': 'Exact Tokens & Cache Savings',
      'feat.2.desc': 'Reads exact uncached input, cache reads, and output tokens directly from local transcripts, turning abstract numbers into clear USD cost & savings insights.',
      'feat.3.title': 'Catch Prefix Cache Drops Early',
      'feat.3.desc': 'Automatically pinpoints the exact turn where prompt caching collapsed, scores session efficiency (0–100), and flags when to run /compact.',
      'feat.4.title': '100% Local-First Privacy',
      'feat.4.desc': 'Prompts, code, and usage ledgers never leave your machine. Built-in 8-language UI follows your Antigravity & OS locale automatically.',
      'price.heading': `Flexible pricing — start free, or own it forever for $${earlyUsd}.`,
      'price.sub': 'Start free forever. Try Pro monthly, save with annual, or pay once during early bird for lifetime access on up to 3 devices.',
      'price.forever': 'forever',
      'price.once': 'one-time',
      'price.subTier': 'Pro Subscription',
      'price.lifeTier': 'Pro Lifetime',
      'price.billMonth': 'Monthly',
      'price.billYear': 'Yearly',
      'price.perMonth': '/ month',
      'price.perYear': '/ year',
      'price.monthlyNote': `Billed $${monthlyUsd} monthly · Cancel anytime`,
      'price.yearlySave': `Save 58% vs. $${monthlyUsd}/mo · Cancel anytime`,
      'price.lifeAnchor': `Just $1 more than 1 year — own Pro forever, no renewals`,
      'price.earlyBadge': 'Best Value · Early Bird',
      'price.freeBtn': 'Install Free via CLI',
      'price.subBtn': 'Subscribe to Pro',
      'price.proBtn': `Buy Lifetime Pro — $${earlyUsd}`,
      'price.f1': 'Live tok/s speed, avg, peak & turn duration',
      'price.f2': 'Waveform & animated Pixel Lion toggle',
      'price.f3': 'Entire Antigravity, Auto-follow & single-session scopes',
      'price.f4': 'Exact cache hit rate & context window ring',
      'price.f5': '7-day daily usage chart & 8-language UI',
      'price.p1': 'Everything in Free, plus:',
      'price.p2': 'Equivalent API cost & Cache Savings ($) analytics',
      'price.p3': 'Project / Workspace cost breakdown table',
      'price.p4': 'Prefix cache-drop audit & /compact alerts (0–100 score)',
      'price.p5': '14-day / Week / Month trends + 14-week heatmap',
      'price.p6': '1-click CSV billing & Markdown report export',
      'price.p7': 'Up to 3 devices · 7-day offline grace · Instant deactivation',
      'faq.heading': 'Frequently Asked Questions',
      'faq.q1': 'Will TokPulse break when Antigravity updates?',
      'faq.a1': 'No. Unlike legacy debugger-port injectors that break after every auto-update, TokPulse is built exclusively on official MCP Apps, non-blocking lifecycle hooks, and standard local transcript logs.',
      'faq.q2': 'Does TokPulse upload my code or chat history?',
      'faq.a2': 'Never. Free mode makes zero network requests. Pro activation sends only your Polar license key and a one-way SHA-256 device hash to verify your seat limit.',
      'faq.q3': 'How do I move my Pro license to a new Mac or PC?',
      'faq.a3': 'Open the Pro modal inside TokPulse and click Deactivate. Your seat is immediately released on Polar so you can activate another machine.',
      'faq.q4': 'Are the USD cost numbers my actual subscription invoice?',
      'faq.a4': 'They are reference API-rate equivalents calculated from exact local token counts so you can compare project efficiency and see how much prompt caching saves you.',
    },
    zh: {
      'nav.features': '核心特性',
      'nav.pricing': '定价方案',
      'nav.faq': '常见问题',
      'nav.getPro': '获取 Pro',
      'hero.badge': '面向 Antigravity v2.34+ 打造的官方原生 MCP App',
      'hero.title': '看清每一次输出速度、每一笔等价成本与缓存省下的真金白银。',
      'hero.sub': '实时 tok/s 速度、精确缓存命中率、前缀缓存断崖诊断与按项目成本账单——100% 本地运行、零调试端口、宿主升级永不断连。',
      'hero.copy': '复制命令',
      'hero.copied': '已复制',
      'hero.ctaPro': `解锁 Pro — 早鸟买断 $${earlyUsd}`,
      'hero.ctaGithub': '查看 GitHub',
      'demo.tabLive': '实时速度',
      'demo.tabBilling': '项目账单',
      'demo.tabDiag': '缓存诊断',
      'demo.scope': '全部会话 · Hooks 在线',
      'demo.latestSpeed': '全局最新速度',
      'demo.avg': '全局平均',
      'demo.turn': '单轮耗时',
      'demo.peak': '全局峰值',
      'demo.savingsTitle': '提示词缓存省钱统计',
      'demo.hitTag': '91.5% 命中率',
      'demo.savingsSub': '按公开 API 费率折算的缓存累计节省金额',
      'demo.cacheRead': '缓存读取',
      'demo.uncached': '未缓存输入',
      'demo.output': '输出',
      'demo.billingHead': '按项目成本拆分（近 30 天）',
      'demo.colProj': '项目',
      'demo.colTokens': '总 Token',
      'demo.colHit': '缓存命中',
      'demo.colEst': '等价成本',
      'demo.colSaved': '缓存节省',
      'demo.diagHead': '会话效率与前缀缓存断崖诊断',
      'demo.diagDrop': '检测到 1 次缓存断崖',
      'demo.diagTip1': '步骤 #42：中途切换模型导致前缀缓存骤降 91%（142K → 12K），额外产生 +$0.24 未缓存输入成本。',
      'demo.diagTip2': '上下文窗口已占用 68% —— 建议在下一阶段重构前先执行 /compact。',
      'feat.heading': '为长期稳定而生，彻底告别“一升级就坏”。',
      'feat.1.title': '100% 官方原生 MCP App 架构',
      'feat.1.desc': '不需要 --remote-debugging-port，不注入 Electron DOM，不改宿主文件；原生支持侧边栏、左侧全屏与对话内联三种入口。',
      'feat.2.title': '精确 Token 与缓存省钱核算',
      'feat.2.desc': '直接读取本地日志精确输入、缓存读取与输出字段，把枯燥的数字变成一眼看懂的等价花费与缓存节省金额。',
      'feat.3.title': '第一时间揪出缓存失效拐点',
      'feat.3.desc': '自动标出哪一轮破坏了前缀缓存、给出 0–100 效率评分，并在上下文偏高时提醒最佳 /compact 时机。',
      'feat.4.title': '100% 本地隐私与 8 语种自适应',
      'feat.4.desc': '对话原文与代码绝不离开你的电脑；界面自动跟随 Antigravity 与操作系统语言切换（支持中/英/日/韩/西/法/德）。',
      'price.heading': `灵活定价——免费起步，或 $${earlyUsd} 早鸟一次买断。`,
      'price.sub': '核心监控永久免费；可按月试用、按年优惠，或直接早鸟一次买断，在最多 3 台设备解锁全部 Pro 功能。',
      'price.forever': '永久免费',
      'price.once': '一次买断',
      'price.subTier': 'Pro 订阅版',
      'price.lifeTier': 'Pro 终身买断',
      'price.billMonth': '按月',
      'price.billYear': '按年',
      'price.perMonth': '/ 月',
      'price.perYear': '/ 年',
      'price.monthlyNote': `每月 $${monthlyUsd} · 随时取消`,
      'price.yearlySave': `比月付（$${monthlyUsd}/月）省 58% · 随时取消`,
      'price.lifeAnchor': `比年付仅多 $1 —— 一次买断，无需续费`,
      'price.earlyBadge': '最值 · 早鸟特惠',
      'price.freeBtn': '命令行免费安装',
      'price.subBtn': '订阅 TokPulse Pro',
      'price.proBtn': `早鸟买断 Pro — $${earlyUsd}`,
      'price.f1': '实时 tok/s 速度、均值、单轮耗时与峰值',
      'price.f2': '波形折线 & 动态像素小狮子双模式切换',
      'price.f3': '监控整个 Antigravity / 自动跟随 / 单会话三种范围',
      'price.f4': '精确缓存命中率与上下文窗口环形进度条',
      'price.f5': '近 7 天趋势图与 8 种语言自动适配',
      'price.p1': '包含 Free 全部功能，并解锁：',
      'price.p2': '等价 API 成本与缓存累计省钱（$）计算',
      'price.p3': '按项目 / 工作区自动拆分成本账单',
      'price.p4': '前缀缓存断崖诊断与 /compact 提醒（0–100 评分）',
      'price.p5': '14 天 / 周 / 月多维趋势 + 14 周活跃热力图',
      'price.p6': '一键导出 CSV 账单与 Markdown 周期报告',
      'price.p7': '支持 3 台设备 · 7 天离线宽限 · 换机一键解绑',
      'faq.heading': '常见问题',
      'faq.q1': 'Antigravity 以后升级，TokPulse 会像旧插件一样失效吗？',
      'faq.a1': '不会。旧插件依赖调试端口和 DOM 注入所以一升级就断；TokPulse 全部基于官方 MCP Apps、无阻塞 Hooks 和标准本地日志，常规升级后直接照常运行。',
      'faq.q2': 'TokPulse 会上传我的代码或聊天记录吗？',
      'faq.a2': '绝不上传。免费版零网络请求；Pro 激活时仅向 Polar 发送激活码和单向 SHA-256 设备哈希，用于校验设备数上限。',
      'faq.q3': '换新电脑时怎么迁移 Pro 授权？',
      'faq.a3': '在旧电脑的 TokPulse 授权弹窗里点击“解绑本机”，Polar 会立即释放名额，直接在新电脑输入同一个 License Key 即可激活。',
      'faq.q4': '看板里的美元金额是我的实际账单扣费吗？',
      'faq.a4': '不是订阅实际扣费，而是基于公开模型 API 参考费率折算的等价花费与缓存节省估值，用于横向对比不同项目和会话的使用效率。',
    },
  };

  let lang = navigator.language && navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';

  function syncSubCard() {
    const dict = COPY[lang];
    const numEl = document.getElementById('subPriceNum');
    const unitEl = document.getElementById('subPriceUnit');
    const noteEl = document.getElementById('subPriceNote');
    if (subCycle === 'monthly') {
      if (numEl) numEl.textContent = `$${monthlyUsd}`;
      if (unitEl) unitEl.textContent = dict['price.perMonth'];
      if (noteEl) noteEl.textContent = dict['price.monthlyNote'];
      if (proSubBtn) proSubBtn.href = monthlyUrl;
    } else {
      if (numEl) numEl.textContent = `$${yearlyUsd}`;
      if (unitEl) unitEl.textContent = dict['price.perYear'];
      if (noteEl) noteEl.textContent = dict['price.yearlySave'];
      if (proSubBtn) proSubBtn.href = yearlyUrl;
    }
  }

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    const dict = COPY[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && dict[key]) el.textContent = dict[key];
    });
    syncSubCard();
  }

  applyLang(lang);

  document.querySelectorAll('.bill-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cycle = btn.getAttribute('data-billing');
      if (cycle !== 'monthly' && cycle !== 'yearly') return;
      subCycle = cycle;
      document.querySelectorAll('.bill-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      syncSubCard();
    });
  });

  document.getElementById('langToggle')?.addEventListener('click', () => {
    applyLang(lang === 'zh' ? 'en' : 'zh');
  });

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  });

  // Copy install command
  const copyBtn = document.getElementById('copyInstallBtn');
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      copyBtn.textContent = COPY[lang]['hero.copied'];
      setTimeout(() => {
        copyBtn.textContent = COPY[lang]['hero.copy'];
      }, 1800);
    } catch {
      // Fallback
    }
  });

  // Interactive demo tabs
  document.querySelectorAll('.demo-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-demo-tab');
      document.querySelectorAll('.demo-tab').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.demo-panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`panel-${target}`)?.classList.add('active');
    });
  });

  // Wave vs Pixel Lion visual toggle in demo
  document.querySelectorAll('.mock-seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-visual');
      document.querySelectorAll('.mock-seg-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('demoVisualLion')?.classList.toggle('hidden', mode !== 'lion');
      document.getElementById('demoVisualWave')?.classList.toggle('hidden', mode !== 'wave');
    });
  });
})();
