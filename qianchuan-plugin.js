(() => {
  const board = document.getElementById('assistantBoard');
  const floatButton = document.getElementById('assistantFloat');
  if (!board || !floatButton) return;

  [
    'strategyPopupStack',
    'voiceParserWindow',
    'phonePreview',
    'commentModal',
    'commentModalMask',
    'banboVoiceBoard',
    'qcMediaPreviewMask',
    'qcTemplateDeleteConfirmMask'
  ].forEach(id => document.getElementById(id)?.remove());

  let deliveryTemplates = [
    { id: 'delivery-scale', name: '放量1000元_2小时', mode: 'scale', budget: 1000, duration: 2, createdAt: '今天 09:58' },
    { id: 'delivery-roi', name: '控成本日500元_ROI2.8', mode: 'controlled', objective: 'roi', dailyBudget: 500, roiTarget: 2.8, createdAt: '今天 09:42' },
    { id: 'delivery-order', name: '控成本日500元_出价35元/成交', mode: 'controlled', objective: 'transaction', dailyBudget: 500, bid: 35, createdAt: '昨天 18:16' }
  ];
  const advertiserAccount = {
    name: 'HELLY HANSEN户外官方旗舰店',
    id: '1745813078562369'
  };

  let recommendations = [
    {
      id: 'rec-001',
      materialId: '7492389152048619571',
      priority: 'urgent',
      tag: '放量',
      product: 'HELLY HANSEN 吸湿速干透气运动短袖',
      productId: '3829850811488403472',
      cover: 'assets/product-1.png',
      deliveryType: 'scale',
      todayDelivery: { count: 3, spend: '342.2' },
      uploadedAt: '2026-07-29 09:24',
      metrics: [
        { label: '近7日消耗', value: '¥3,286.40' },
        { label: '点击率', value: '6.82%', good: true },
        { label: '成交订单', value: '128' },
        { label: 'ROI', value: '3.42', good: true }
      ]
    },
    {
      id: 'rec-002',
      materialId: '7492389068877334821',
      priority: 'normal',
      tag: '稳投',
      product: '王一博同款 HH 夏季情侣速干抗菌短袖',
      productId: '3829847837299048729',
      cover: 'assets/product-2.png',
      deliveryType: 'controlled',
      todayDelivery: { count: 1, spend: '186.5' },
      uploadedAt: '2026-07-28 18:46',
      metrics: [
        { label: '近7日消耗', value: '¥2,108.20' },
        { label: '点击率', value: '5.91%', good: true },
        { label: '成交订单', value: '76' },
        { label: 'ROI', value: '2.91', good: true }
      ]
    },
    {
      id: 'rec-003',
      materialId: '7492388995021046803',
      priority: 'test',
      tag: '新素材',
      product: 'HELLY HANSEN 速干凉感防晒针织长裤',
      productId: '3829846658187919626',
      cover: 'assets/product-3.png',
      deliveryType: 'controlled',
      uploadedAt: '2026-07-29 10:06',
      metrics: [
        { label: '近7日消耗', value: '¥0.00' },
        { label: '点击率', value: '--' },
        { label: '成交订单', value: '0' },
        { label: 'ROI', value: '--' }
      ]
    }
  ];
  let materialPoolCounts = {
    scale: 126,
    steady: 174,
    fresh: 118,
    replacement: 76
  };
  let recallableMaterials = [
    {
      materialId: '7418260953157284921',
      productId: '3829850811488403472',
      name: '夏季速干短袖直播高光切片',
      cover: 'assets/product-1.png',
      metrics: [
        { label: '历史消耗', value: '¥2,864.20' },
        { label: '点击率', value: '6.38%', good: true },
        { label: '成交订单', value: '109' },
        { label: 'ROI', value: '3.26', good: true }
      ]
    },
    {
      materialId: '7418260876421093785',
      productId: '3829847837299048729',
      name: '情侣速干短袖上身展示',
      cover: 'assets/product-2.png',
      metrics: [
        { label: '历史消耗', value: '¥1,725.80' },
        { label: '点击率', value: '5.72%', good: true },
        { label: '成交订单', value: '61' },
        { label: 'ROI', value: '2.75', good: true }
      ]
    },
    {
      materialId: '7418260795086421608',
      productId: '3829846658187919626',
      name: '凉感长裤夏季场景展示',
      cover: 'assets/product-3.png',
      metrics: [
        { label: '历史消耗', value: '¥586.60' },
        { label: '点击率', value: '4.96%' },
        { label: '成交订单', value: '16' },
        { label: 'ROI', value: '2.18' }
      ]
    },
    {
      materialId: '7418260661938042754',
      productId: '3829850811488403472',
      name: '速干短袖面料细节讲解',
      cover: 'assets/product-1.png',
      metrics: [
        { label: '历史消耗', value: '¥1,042.40' },
        { label: '点击率', value: '5.36%', good: true },
        { label: '成交订单', value: '38' },
        { label: 'ROI', value: '2.63', good: true }
      ]
    }
  ];
  let replacementMaterials = [
    {
      materialId: '7394180627519402635', productId: '3829850811488403472', cover: 'assets/product-1.png', priority: 'replacement', tag: '待汰换', uploadedAt: '2026-06-18 15:42',
      metrics: [{ label: '近7日消耗', value: '¥482.30' }, { label: '点击率', value: '1.76%' }, { label: '成交订单', value: '4' }, { label: 'ROI', value: '0.86' }]
    },
    {
      materialId: '7394180540837619026', productId: '3829847837299048729', cover: 'assets/product-2.png', priority: 'replacement', tag: '待汰换', uploadedAt: '2026-06-21 11:08',
      metrics: [{ label: '近7日消耗', value: '¥318.50' }, { label: '点击率', value: '2.04%' }, { label: '成交订单', value: '3' }, { label: 'ROI', value: '1.12' }]
    }
  ];

  let activeTab = 'suggestions';
  let activeSuggestionDeliveryType = 'scale';
  let selectedRecommendationIds = new Set();
  let selectedBatchRecommendations = [];
  let batchPlanConfigs = {};
  let batchTemplateFillId = '';
  let batchDeliveryType = '';
  let creating = false;
  let selectedRecallMaterialIds = new Set();
  let selectedReplacementMaterialIds = new Set();
  let autoMaterialScreeningEnabled = true;

  floatButton.innerHTML = '<span class="orb">投</span><span class="vertical">千川<br>快投</span>';
  floatButton.setAttribute('aria-label', '打开千川快投');

  board.innerHTML = `
    <div class="board-header">
      <div class="plugin-logo">
        <span class="plugin-mark">投</span>
        <span>千川快投</span>
        <span class="version"><span class="qc-live-dot"></span>直播中</span>
      </div>
      <div class="header-actions">
        <button class="header-btn" id="settingsToggle" title="追投设置" aria-label="打开追投设置">⚙</button>
        <button class="header-btn" id="closeBoard" aria-label="收起千川快投">↘</button>
      </div>
    </div>
    <div class="board-body">
      <nav class="board-tabs" aria-label="千川快投功能">
        <button class="board-tab active" data-qc-tab="suggestions">建议追投</button>
        <button class="board-tab" data-qc-tab="replacement">待汰换</button>
        <button class="board-tab" data-qc-tab="recall">可召回</button>
      </nav>
      <div class="tab-content active" data-qc-panel="suggestions">
        <div class="qc-suggestion-scroll">
          <div id="suggestionList"></div>
        </div>
        <div class="qc-selection-bar" id="suggestionSelectionBar"></div>
      </div>
      <div class="tab-content" data-qc-panel="replacement">
        <div class="qc-direct-pool-scroll"><div class="qc-list" id="replacementList"></div></div>
        <div class="qc-selection-bar">
          <button class="qc-select-all-button" id="selectAllReplacement">全选</button>
          <span class="qc-selected-count" id="selectedReplacementCount">已选 0 个</span>
          <button class="qc-batch-btn" id="batchReplaceMaterials" disabled>批量淘汰</button>
        </div>
      </div>
      <div class="tab-content" data-qc-panel="recall">
        <div class="qc-direct-pool-scroll"><div class="qc-list" id="recallList"></div></div>
        <div class="qc-selection-bar">
          <button class="qc-select-all-button" id="selectAllRecall">全选</button>
          <span class="qc-selected-count" id="selectedRecallCount">已选 0 个</span>
          <button class="qc-batch-btn" id="batchRecallMaterials" disabled>批量召回</button>
        </div>
      </div>
      <div class="tab-content" data-qc-panel="settings">
        <div class="qc-template-manager" id="templateManager"></div>
      </div>
    </div>
    <div class="qc-modal-mask" id="templateModalMask" role="presentation">
      <section class="qc-modal" role="dialog" aria-modal="true" aria-labelledby="templateModalTitle">
        <div class="qc-modal-head">
          <b id="templateModalTitle">设置追投方式</b>
          <button class="qc-modal-close" id="closeTemplateModal" aria-label="关闭">×</button>
        </div>
        <div class="qc-modal-body">
          <div class="qc-selected-material" id="selectedMaterial"></div>
          <div class="qc-template-title" id="templateSectionTitle">设置追投参数</div>
          <div class="qc-batch-template-fill" id="batchTemplateFill"></div>
          <div class="qc-template-list" id="templateList"></div>
          <div class="qc-modal-note" id="templateModalNote">确认后将按当前参数创建千川计划。创建期间请勿重复点击。</div>
        </div>
        <div class="qc-modal-foot">
          <button class="qc-secondary-btn" id="cancelTemplateModal">取消</button>
          <button class="qc-primary-btn" id="confirmCreatePlan">确认创建计划</button>
        </div>
      </section>
    </div>
    <div class="qc-toast" id="qcToast" aria-live="polite"></div>`;

  const suggestionList = document.getElementById('suggestionList');
  const suggestionSelectionBar = document.getElementById('suggestionSelectionBar');
  const replacementList = document.getElementById('replacementList');
  const recallList = document.getElementById('recallList');
  const modalMask = document.getElementById('templateModalMask');
  const toast = document.getElementById('qcToast');
  document.body.appendChild(modalMask);

  const mediaPreviewMask = document.createElement('div');
  mediaPreviewMask.id = 'qcMediaPreviewMask';
  mediaPreviewMask.className = 'qc-media-preview-mask';
  mediaPreviewMask.innerHTML = `
    <section class="qc-media-preview" role="dialog" aria-modal="true" aria-labelledby="qcMediaPreviewTitle">
      <div class="qc-media-preview-head">
        <b id="qcMediaPreviewTitle">素材预览</b>
        <button type="button" class="qc-modal-close" data-close-media-preview aria-label="关闭预览">×</button>
      </div>
      <div class="qc-media-preview-body">
        <div class="qc-video-preview" id="qcVideoPreview" hidden>
          <div class="qc-video-canvas playing" id="qcVideoCanvas">
            <img id="qcVideoPreviewFrame" alt="素材视频预览">
            <div class="qc-video-state"><span>素材播放中</span><span>00:06</span></div>
            <button type="button" class="qc-video-toggle" data-toggle-material-preview aria-label="暂停素材">Ⅱ</button>
            <div class="qc-video-progress"><i></i></div>
          </div>
        </div>
        <img class="qc-image-preview" id="qcImagePreview" alt="商品主图大图" hidden>
      </div>
    </section>`;
  document.body.appendChild(mediaPreviewMask);

  const templateManagerModalMask = document.createElement('div');
  templateManagerModalMask.id = 'qcTemplateManagerModalMask';
  templateManagerModalMask.className = 'qc-template-manager-modal-mask';
  templateManagerModalMask.innerHTML = `
    <section class="qc-template-manager-modal" role="dialog" aria-modal="true" aria-labelledby="qcTemplateManagerTitle">
      <div class="qc-modal-head">
        <b id="qcTemplateManagerTitle">新建追投模版</b>
        <button type="button" class="qc-modal-close" data-close-template-manager aria-label="关闭">×</button>
      </div>
      <div class="qc-template-manager-modal-body" id="templateManagerModalBody"></div>
      <div class="qc-modal-foot">
        <button type="button" class="qc-secondary-btn" data-close-template-manager>取消</button>
        <button type="button" class="qc-primary-btn" id="saveManagedTemplate">保存</button>
      </div>
    </section>`;
  document.body.appendChild(templateManagerModalMask);

  const templateDeleteConfirmMask = document.createElement('div');
  templateDeleteConfirmMask.id = 'qcTemplateDeleteConfirmMask';
  templateDeleteConfirmMask.className = 'qc-template-delete-confirm-mask';
  templateDeleteConfirmMask.innerHTML = `
    <section class="qc-template-delete-confirm" role="dialog" aria-modal="true" aria-labelledby="qcTemplateDeleteConfirmTitle">
      <div class="qc-modal-head">
        <b id="qcTemplateDeleteConfirmTitle">删除追投模版</b>
        <button type="button" class="qc-modal-close" data-close-template-delete aria-label="关闭">×</button>
      </div>
      <div class="qc-template-delete-confirm-body">确认删除 <b id="qcTemplateDeleteConfirmName"></b> 吗？删除后不可恢复。</div>
      <div class="qc-modal-foot">
        <button type="button" class="qc-secondary-btn" data-close-template-delete>取消</button>
        <button type="button" class="qc-primary-btn qc-danger-btn" data-confirm-template-delete>确认删除</button>
      </div>
    </section>`;
  document.body.appendChild(templateDeleteConfirmMask);

  const materialActionConfirmMask = document.createElement('div');
  materialActionConfirmMask.id = 'qcMaterialActionConfirmMask';
  materialActionConfirmMask.className = 'qc-template-delete-confirm-mask';
  materialActionConfirmMask.innerHTML = `
    <section class="qc-template-delete-confirm" role="dialog" aria-modal="true" aria-labelledby="qcMaterialActionConfirmTitle">
      <div class="qc-modal-head">
        <b id="qcMaterialActionConfirmTitle">确认操作</b>
        <button type="button" class="qc-modal-close" data-close-material-action aria-label="关闭">×</button>
      </div>
      <div class="qc-template-delete-confirm-body" id="qcMaterialActionConfirmBody"></div>
      <div class="qc-modal-foot">
        <button type="button" class="qc-secondary-btn" data-close-material-action>取消</button>
        <button type="button" class="qc-primary-btn" id="confirmMaterialAction"></button>
      </div>
    </section>`;
  document.body.appendChild(materialActionConfirmMask);

  let templateManagerDraft = null;
  let pendingTemplateDeletion = null;
  let pendingMaterialAction = '';

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 1900);
  }

  async function copyId(value, successMessage) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      const fallback = document.createElement('textarea');
      fallback.value = value;
      fallback.setAttribute('readonly', '');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand('copy');
      fallback.remove();
    }
    showToast(successMessage);
  }

  function copyMaterialId(materialId) {
    return copyId(materialId, '素材ID已复制');
  }

  function displayMaterialId(materialId) {
    return `***${String(materialId).slice(-4)}`;
  }

  function openMaterialPreview(cover, materialId) {
    document.getElementById('qcMediaPreviewTitle').textContent = `素材ID：${displayMaterialId(materialId)}`;
    document.getElementById('qcImagePreview').hidden = true;
    const videoPreview = document.getElementById('qcVideoPreview');
    const videoCanvas = document.getElementById('qcVideoCanvas');
    const toggleButton = mediaPreviewMask.querySelector('[data-toggle-material-preview]');
    document.getElementById('qcVideoPreviewFrame').src = cover;
    videoPreview.hidden = false;
    videoCanvas.classList.add('playing');
    toggleButton.textContent = 'Ⅱ';
    toggleButton.setAttribute('aria-label', '暂停素材');
    mediaPreviewMask.classList.add('open');
  }

  function openProductPreview(imageUrl) {
    document.getElementById('qcMediaPreviewTitle').textContent = '商品主图';
    document.getElementById('qcVideoPreview').hidden = true;
    const image = document.getElementById('qcImagePreview');
    image.src = imageUrl;
    image.hidden = false;
    mediaPreviewMask.classList.add('open');
  }

  function closeMediaPreview() {
    mediaPreviewMask.classList.remove('open');
    document.getElementById('qcVideoCanvas').classList.remove('playing');
  }

  document.addEventListener('click', event => {
    const copyButton = event.target.closest('[data-copy-material-id]');
    if (copyButton) {
      event.preventDefault();
      event.stopPropagation();
      copyMaterialId(copyButton.dataset.copyMaterialId);
      return;
    }
    const materialPreview = event.target.closest('[data-material-preview-cover]');
    if (materialPreview) {
      event.preventDefault();
      event.stopPropagation();
      openMaterialPreview(materialPreview.dataset.materialPreviewCover, materialPreview.dataset.materialPreviewId);
      return;
    }

    const productPreview = event.target.closest('[data-product-preview]');
    if (productPreview) {
      event.preventDefault();
      event.stopPropagation();
      openProductPreview(productPreview.dataset.productPreview);
    }
  }, true);

  mediaPreviewMask.addEventListener('click', event => {
    if (event.target === mediaPreviewMask || event.target.closest('[data-close-media-preview]')) {
      closeMediaPreview();
      return;
    }
    if (event.target.closest('[data-toggle-material-preview]')) {
      const videoCanvas = document.getElementById('qcVideoCanvas');
      const isPlaying = videoCanvas.classList.toggle('playing');
      event.target.textContent = isPlaying ? 'Ⅱ' : '▶';
      event.target.setAttribute('aria-label', isPlaying ? '暂停素材' : '继续播放素材');
    }
  });

  function openTab(tab) {
    activeTab = tab;
    board.querySelectorAll('[data-qc-tab]').forEach(button => {
      button.classList.toggle('active', button.dataset.qcTab === tab);
    });
    board.querySelectorAll('[data-qc-panel]').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.qcPanel === tab);
    });
    const settingsToggle = document.getElementById('settingsToggle');
    const inSettings = tab === 'settings';
    settingsToggle.textContent = inSettings ? '←' : '⚙';
    settingsToggle.title = inSettings ? '返回建议追投' : '追投设置';
    settingsToggle.setAttribute('aria-label', inSettings ? '返回建议追投' : '打开追投设置');
  }

  function renderMaterialCard(item, selected, selectionAttribute, options = {}) {
    const serverMaterial = options.serverMaterial === true;
    const materialHeading = serverMaterial
      ? `<div class="qc-recalled-material-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>`
      : `<div class="qc-title-row">
          <span class="qc-material-tag ${escapeHtml(item.priority)}">${escapeHtml(item.tag)}</span>
          <div class="qc-material-id" title="素材ID：${escapeHtml(displayMaterialId(item.materialId))}">${escapeHtml(displayMaterialId(item.materialId))}</div>
          <button type="button" class="qc-copy-id-button" data-copy-material-id="${escapeHtml(item.materialId)}" title="复制素材ID" aria-label="复制素材ID">⧉</button>
          ${item.todayDelivery ? `<span class="qc-today-delivery">今日已投${escapeHtml(item.todayDelivery.count)}次，消耗${escapeHtml(item.todayDelivery.spend)}元</span>` : ''}
        </div>`;
    return `
      <article class="qc-suggestion ${selected ? 'selected' : ''}" ${selectionAttribute} role="button" tabindex="0" aria-pressed="${selected ? 'true' : 'false'}">
        <div class="qc-suggestion-body">
          <div class="qc-material">
            <button type="button" class="qc-cover-wrap qc-media-button" data-material-preview-cover="${escapeHtml(item.cover)}" data-material-preview-id="${escapeHtml(item.materialId)}" aria-label="播放素材${serverMaterial ? ` ${escapeHtml(item.name)}` : `ID ${escapeHtml(displayMaterialId(item.materialId))}`}"><img class="qc-cover" src="${escapeHtml(item.cover)}" alt="素材封面"><span class="qc-play">▶</span></button>
            <div class="qc-material-copy">
              ${materialHeading}
              <div class="qc-product-data-row">
                <button type="button" class="qc-product-main-image qc-media-button" data-product-preview="${escapeHtml(item.cover)}" aria-label="放大商品主图"><img src="${escapeHtml(item.cover)}" alt="商品主图"></button>
                <div class="qc-metrics">${item.metrics.map(metric => `<div class="qc-metric"><span>${escapeHtml(metric.label)}</span><b class="${metric.good ? 'good' : ''}">${escapeHtml(metric.value)}</b></div>`).join('')}</div>
              </div>
            </div>
          </div>
          ${item.uploadedAt ? `<div class="qc-suggestion-meta">上传时间：${escapeHtml(item.uploadedAt)}</div>` : ''}
        </div>
      </article>`;
  }

  function renderGroupSelectionBar(group, items) {
    const selectedCount = items.filter(item => selectedRecommendationIds.has(item.id)).length;
    const allSelected = items.length > 0 && selectedCount === items.length;
    return `<button type="button" class="qc-select-all-button" data-select-recommendation-group="${group}" ${items.length ? '' : 'disabled'}>${allSelected ? '取消全选' : '全选'}</button>
      <span class="qc-selected-count">已选 ${selectedCount} 个</span>
      <button type="button" class="qc-batch-btn" data-batch-create-group="${group}" ${selectedCount ? '' : 'disabled'}>批量创建计划</button>`;
  }

  function renderSuggestions() {
    const currentIds = new Set(recommendations.map(item => item.id));
    selectedRecommendationIds = new Set([...selectedRecommendationIds].filter(id => currentIds.has(id)));
    const scaleCount = recommendations.filter(item => item.deliveryType === 'scale').length;
    const controlledCount = recommendations.filter(item => item.deliveryType === 'controlled').length;
    const group = activeSuggestionDeliveryType === 'scale'
      ? { key: 'scale', title: '建议放量追投' }
      : { key: 'controlled', title: '建议控成本追投' };
    const items = recommendations.filter(item => item.deliveryType === group.key);
    suggestionList.innerHTML = `<div class="qc-suggestion-mode-switch qc-segmented" role="tablist" aria-label="建议追投方式">
        <button type="button" class="qc-segment-button ${group.key === 'scale' ? 'active' : ''}" data-suggestion-delivery-type="scale" role="tab" aria-selected="${group.key === 'scale'}">放量追投<span class="qc-suggestion-count">${scaleCount}</span></button>
        <button type="button" class="qc-segment-button ${group.key === 'controlled' ? 'active' : ''}" data-suggestion-delivery-type="controlled" role="tab" aria-selected="${group.key === 'controlled'}">控成本追投<span class="qc-suggestion-count">${controlledCount}</span></button>
      </div>
      <section class="qc-recommendation-group" aria-labelledby="${group.key}RecommendationTitle">
        <div class="qc-section-heading"><h2 id="${group.key}RecommendationTitle">${group.title}</h2><span>${items.length} 个素材</span></div>
        <div class="qc-list">${items.length ? items.map(item => renderMaterialCard(item, selectedRecommendationIds.has(item.id), `data-recommendation-id="${escapeHtml(item.id)}"`)).join('') : '<div class="qc-group-empty">暂无当前推荐素材</div>'}</div>
      </section>`;
    suggestionSelectionBar.innerHTML = renderGroupSelectionBar(group.key, items);
  }

  function renderDirectMaterialPanel(items, selection, options) {
    const { list, selectAllId, selectedCountId, actionId, selectionAttribute, serverMaterial } = options;
    const ids = new Set(items.map(item => item.materialId));
    const validSelection = new Set([...selection].filter(id => ids.has(id)));
    selection.clear();
    validSelection.forEach(id => selection.add(id));
    const allSelected = items.length > 0 && selection.size === items.length;
    document.getElementById(selectAllId).disabled = !items.length;
    document.getElementById(selectAllId).textContent = allSelected ? '取消全选' : '全选';
    document.getElementById(selectedCountId).textContent = `已选 ${selection.size} 个`;
    document.getElementById(actionId).disabled = selection.size === 0;
    list.innerHTML = items.length ? items.map(item => renderMaterialCard(item, selection.has(item.materialId), `${selectionAttribute}="${escapeHtml(item.materialId)}"`, { serverMaterial })).join('') : '<div class="qc-empty"><div><div class="qc-empty-icon">✓</div><b>暂无素材</b><span>当前没有需要处理的素材</span></div></div>';
  }

  function renderReplacementMaterials() {
    renderDirectMaterialPanel(replacementMaterials, selectedReplacementMaterialIds, {
      list: replacementList, selectAllId: 'selectAllReplacement', selectedCountId: 'selectedReplacementCount', actionId: 'batchReplaceMaterials', selectionAttribute: 'data-replacement-material-id'
    });
  }

  function renderRecallMaterials() {
    renderDirectMaterialPanel(recallableMaterials, selectedRecallMaterialIds, {
      list: recallList, selectAllId: 'selectAllRecall', selectedCountId: 'selectedRecallCount', actionId: 'batchRecallMaterials', selectionAttribute: 'data-recall-material-id', serverMaterial: true
    });
  }

  function recallSelectedMaterials() {
    const recalled = recallableMaterials.filter(item => selectedRecallMaterialIds.has(item.materialId));
    if (!recalled.length) return;
    recallableMaterials = recallableMaterials.filter(item => !selectedRecallMaterialIds.has(item.materialId));
    selectedRecallMaterialIds = new Set();
    renderRecallMaterials();
    showToast(`已召回 ${recalled.length} 个素材到素材库`);
  }

  function replaceSelectedMaterials() {
    const removed = replacementMaterials.filter(item => selectedReplacementMaterialIds.has(item.materialId));
    if (!removed.length) return;
    replacementMaterials = replacementMaterials.filter(item => !selectedReplacementMaterialIds.has(item.materialId));
    selectedReplacementMaterialIds = new Set();
    renderReplacementMaterials();
    showToast(`已淘汰 ${removed.length} 个素材`);
  }

  function openMaterialActionConfirm(action) {
    const count = action === 'recall' ? selectedRecallMaterialIds.size : selectedReplacementMaterialIds.size;
    if (!count) return;
    const recall = action === 'recall';
    pendingMaterialAction = action;
    document.getElementById('qcMaterialActionConfirmTitle').textContent = recall ? '确认批量召回' : '确认批量淘汰';
    document.getElementById('qcMaterialActionConfirmBody').innerHTML = recall
      ? `确认召回已选的 <b>${count} 个素材</b> 到素材库吗？`
      : `确认淘汰已选的 <b>${count} 个素材</b> 吗？淘汰后将从素材库移除。`;
    document.getElementById('confirmMaterialAction').textContent = recall ? '确认召回' : '确认淘汰';
    materialActionConfirmMask.classList.add('open');
  }

  function closeMaterialActionConfirm() {
    materialActionConfirmMask.classList.remove('open');
    pendingMaterialAction = '';
  }

  function defaultPlanConfig(item, deliveryType = item.deliveryType) {
    if (deliveryType === 'scale') {
      return { templateId: '', saveAsTemplate: false, mode: 'scale', budget: 1000, duration: 2, objective: 'roi', dailyBudget: 500, roiTarget: 3, bid: 35 };
    }
    if (item.tag === '稳投') {
      return { templateId: '', saveAsTemplate: false, mode: 'controlled', budget: 800, duration: 2, objective: 'roi', dailyBudget: 500, roiTarget: 2.8, bid: 35 };
    }
    return { templateId: '', saveAsTemplate: false, mode: 'controlled', budget: 300, duration: 2, objective: 'transaction', dailyBudget: 200, roiTarget: 2.5, bid: 35 };
  }

  function deliveryTemplateOptions(selectedId, deliveryType) {
    const matchingTemplates = deliveryTemplates.filter(template => template.mode === deliveryType);
    return `<option value="" disabled hidden ${!selectedId ? 'selected' : ''}></option>
      <option value="__manual__" ${selectedId === '__manual__' ? 'selected' : ''}>不使用已有模版，手动创建</option>${matchingTemplates.map(template => `
      <option value="${escapeHtml(template.id)}" ${template.id === selectedId ? 'selected' : ''}>${escapeHtml(template.name)}</option>`).join('')}`;
  }

  function batchTemplateFillOptions(selectedId, deliveryType) {
    return `<option value="" disabled hidden ${!selectedId ? 'selected' : ''}></option>${deliveryTemplates.filter(template => template.mode === deliveryType).map(template => `
      <option value="${escapeHtml(template.id)}" ${template.id === selectedId ? 'selected' : ''}>${escapeHtml(template.name)}</option>`).join('')}`;
  }

  function applyDeliveryTemplate(config, templateId) {
    const template = deliveryTemplates.find(item => item.id === templateId);
    if (!template) return;
    Object.assign(config, {
      templateId: template.id,
      saveAsTemplate: false,
      mode: template.mode,
      budget: template.budget ?? config.budget,
      duration: template.duration ?? config.duration,
      objective: template.objective ?? config.objective,
      dailyBudget: template.dailyBudget ?? config.dailyBudget,
      roiTarget: template.roiTarget ?? config.roiTarget,
      bid: template.bid ?? config.bid
    });
  }

  function generatedTemplateName(config) {
    if (config.mode === 'scale') {
      return `放量${Number(config.budget)}元_${Number(config.duration)}小时`;
    }
    if (config.objective === 'roi') {
      return `控成本日${Number(config.dailyBudget)}元_ROI${Number(config.roiTarget)}`;
    }
    return `控成本日${Number(config.dailyBudget)}元_出价${Number(config.bid)}元/成交`;
  }

  function renderTemplateManager() {
    const manager = document.getElementById('templateManager');
    manager.innerHTML = `
      <section class="qc-advertiser-account" aria-label="千川广告主账号">
        <span>千川广告主账号</span>
        <div>
          <b>${escapeHtml(advertiserAccount.name)}</b>
          <i>广告主ID：${escapeHtml(advertiserAccount.id)}</i>
        </div>
      </section>
      <section class="qc-auto-material-screening" aria-label="千川素材库自动筛选素材">
        <div class="qc-auto-material-screening-copy">
          <b>千川素材库自动筛选素材</b>
          <span>${autoMaterialScreeningEnabled ? '已开启：自动分层，并移出低效素材' : '已关闭：不自动移除素材'}</span>
        </div>
        <label class="qc-switch" title="${autoMaterialScreeningEnabled ? '关闭自动筛选素材' : '开启自动筛选素材'}">
          <input type="checkbox" data-auto-material-screening ${autoMaterialScreeningEnabled ? 'checked' : ''} aria-label="千川素材库自动筛选素材">
          <span class="qc-switch-control" aria-hidden="true"></span>
        </label>
      </section>
      <div class="qc-template-section-head">
        <div class="qc-template-section-copy">
          <b>追投模版</b>
          <span>共 ${deliveryTemplates.length} 个</span>
        </div>
        <button type="button" class="qc-primary-btn qc-template-add-btn" data-new-managed-template="delivery">＋ 新建追投模版</button>
      </div>
      <div class="qc-managed-template-list">
        ${deliveryTemplates.map(template => `
          <article class="qc-managed-template ${template.mode === 'scale' ? 'scale' : 'controlled'}">
            <div class="qc-managed-template-main">
              <div class="qc-managed-template-title"><span class="qc-template-mode ${template.mode === 'scale' ? 'scale' : 'controlled'}">${template.mode === 'scale' ? '放量追投' : '控成本追投'}</span><b>${escapeHtml(template.name)}</b></div>
              <span class="qc-managed-template-time">创建于 ${escapeHtml(template.createdAt)}</span>
            </div>
            <div class="qc-managed-template-actions">
              <button type="button" class="qc-icon-btn qc-template-icon-btn" data-edit-managed-template="delivery:${escapeHtml(template.id)}" title="编辑追投模版" aria-label="编辑追投模版">✎</button>
              <button type="button" class="qc-icon-btn qc-template-icon-btn danger" data-delete-managed-template="delivery:${escapeHtml(template.id)}" title="删除追投模版" aria-label="删除追投模版">×</button>
            </div>
          </article>`).join('')}
      </div>`;
  }

  function renderTemplateManagerModal() {
    const { kind, data, originalId } = templateManagerDraft;
    document.getElementById('qcTemplateManagerTitle').textContent = `${originalId ? '编辑' : '新建'}追投模版`;
    const body = document.getElementById('templateManagerModalBody');
    const isScale = data.mode === 'scale';
    const isRoi = data.objective === 'roi';
    const targetField = isRoi
      ? `<label class="qc-control-field"><span>综合ROI目标</span><div class="qc-input-unit"><input type="number" min="0.01" step="0.1" value="${escapeHtml(data.roiTarget)}" data-managed-field="roiTarget"></div></label>`
      : `<label class="qc-control-field"><span>我的出价</span><div class="qc-input-unit"><i>¥</i><input type="number" min="0.01" step="1" value="${escapeHtml(data.bid)}" data-managed-field="bid"><i>元/成交</i></div></label>`;
    body.innerHTML = `
      <section class="qc-plan-settings qc-template-form-settings">
        <div class="qc-plan-settings-heading"><span>追投计划设置</span><i>模版配置</i></div>
        <div class="qc-config-block">
          <span class="qc-config-label">追投方式</span>
          <div class="qc-segmented" role="group" aria-label="追投方式">
            <button type="button" class="qc-segment-button ${isScale ? 'active' : ''}" data-managed-mode="scale">放量追投</button>
            <button type="button" class="qc-segment-button ${!isScale ? 'active' : ''}" data-managed-mode="controlled">控成本追投</button>
          </div>
        </div>
        ${isScale ? `
          <div class="qc-config-grid scale">
            <label class="qc-control-field"><span>调控预算</span><div class="qc-input-unit"><i>¥</i><input type="number" min="1" step="100" value="${escapeHtml(data.budget)}" data-managed-field="budget"></div></label>
            <label class="qc-control-field"><span>调控时长</span><div class="qc-input-unit"><input type="number" min="1" max="24" step="1" value="${escapeHtml(data.duration)}" data-managed-field="duration"><i>小时</i></div></label>
          </div>` : `
          <div class="qc-config-block">
            <span class="qc-config-label">优化目标</span>
            <div class="qc-segmented" role="group" aria-label="优化目标">
              <button type="button" class="qc-segment-button ${isRoi ? 'active' : ''}" data-managed-objective="roi">综合ROI</button>
              <button type="button" class="qc-segment-button ${!isRoi ? 'active' : ''}" data-managed-objective="transaction">直播间成交</button>
            </div>
          </div>
          <div class="qc-config-grid controlled">
            <label class="qc-control-field"><span>调控日预算</span><div class="qc-input-unit"><i>¥</i><input type="number" min="1" step="100" value="${escapeHtml(data.dailyBudget)}" data-managed-field="dailyBudget"></div></label>
            ${targetField}
          </div>`}
      </section>`;
  }

  function openTemplateManagerModal(kind, id) {
    const template = id ? deliveryTemplates.find(item => item.id === id) : null;
    templateManagerDraft = {
      kind,
      originalId: template?.id || null,
      data: template ? { ...template } : { id: `delivery-${Date.now()}`, name: '', mode: 'scale', budget: 1000, duration: 2, objective: 'roi', dailyBudget: 500, roiTarget: 2.8, bid: 35, createdAt: '刚刚' }
    };
    renderTemplateManagerModal();
    templateManagerModalMask.classList.add('open');
  }

  function closeTemplateManagerModal() {
    templateManagerModalMask.classList.remove('open');
    templateManagerDraft = null;
  }

  function saveManagedTemplate() {
    if (!templateManagerDraft) return;
    const { kind, data, originalId } = templateManagerDraft;
    if (data.mode === 'scale' && (Number(data.budget) <= 0 || Number(data.duration) <= 0)) {
      showToast('请填写有效的预算和时长');
      return;
    }
    if (data.mode === 'controlled' && (Number(data.dailyBudget) <= 0 || (data.objective === 'roi' ? Number(data.roiTarget) <= 0 : Number(data.bid) <= 0))) {
      showToast('请填写有效的控成本参数');
      return;
    }
    data.name = generatedTemplateName(data);
    deliveryTemplates = originalId ? deliveryTemplates.map(item => item.id === originalId ? data : item) : [data, ...deliveryTemplates];
    renderTemplateManager();
    closeTemplateManagerModal();
    showToast('追投模版已保存');
  }

  function deleteManagedTemplate(kind, id) {
    deliveryTemplates = deliveryTemplates.filter(item => item.id !== id);
    renderTemplateManager();
    showToast('追投模版已删除');
  }

  function openTemplateDeleteConfirm(kind, id) {
    const template = deliveryTemplates.find(item => item.id === id);
    if (!template) return;
    pendingTemplateDeletion = { kind, id };
    document.getElementById('qcTemplateDeleteConfirmName').textContent = template.name;
    templateDeleteConfirmMask.classList.add('open');
  }

  function closeTemplateDeleteConfirm() {
    templateDeleteConfirmMask.classList.remove('open');
    pendingTemplateDeletion = null;
  }

  function renderPlanFields(item) {
    const config = batchPlanConfigs[item.id];
    const deliveryType = item.deliveryType || batchDeliveryType;
    const selectedTemplate = deliveryTemplates.find(template => template.id === config.templateId && template.mode === deliveryType);
    const isManual = config.templateId === '__manual__';
    const templateSelector = `
      <div class="qc-config-block qc-template-selector ${isManual ? 'manual' : ''}">
        <span class="qc-config-label">追投模版</span>
        <select data-plan-template-for="${escapeHtml(item.id)}">${deliveryTemplateOptions(config.templateId, deliveryType)}</select>
        ${isManual ? `<div class="qc-save-template-row"><label><input type="checkbox" ${config.saveAsTemplate ? 'checked' : ''} data-plan-id="${escapeHtml(item.id)}" data-plan-field="saveAsTemplate"><span>创建为新模版</span></label></div>` : ''}
      </div>`;

    if (selectedTemplate) return templateSelector;

    if (!isManual) {
      return templateSelector;
    }

    const planSettingsHeader = '<div class="qc-plan-settings-heading"><span>追投计划设置</span><i>手动配置</i></div>';
    if (config.mode === 'scale') {
      return `${templateSelector}<section class="qc-plan-settings">${planSettingsHeader}
          <div class="qc-config-grid scale">
            <label class="qc-control-field"><span>调控预算</span><div class="qc-input-unit"><i>¥</i><input type="number" min="1" step="100" value="${escapeHtml(config.budget)}" data-plan-id="${escapeHtml(item.id)}" data-plan-field="budget"></div></label>
            <label class="qc-control-field"><span>调控时长</span><div class="qc-input-unit"><input type="number" min="1" max="24" step="1" value="${escapeHtml(config.duration)}" data-plan-id="${escapeHtml(item.id)}" data-plan-field="duration"><i>小时</i></div></label>
          </div>
        </section>`;
    }

    const targetField = config.objective === 'roi'
      ? `<label class="qc-control-field"><span>综合ROI目标</span><div class="qc-input-unit"><input type="number" min="0.01" step="0.1" value="${escapeHtml(config.roiTarget)}" data-plan-id="${escapeHtml(item.id)}" data-plan-field="roiTarget"></div></label>`
      : `<label class="qc-control-field"><span>我的出价</span><div class="qc-input-unit"><i>¥</i><input type="number" min="0.01" step="1" value="${escapeHtml(config.bid)}" data-plan-id="${escapeHtml(item.id)}" data-plan-field="bid"><i>元/成交</i></div></label>`;

    return `${templateSelector}<section class="qc-plan-settings">${planSettingsHeader}
        <div class="qc-config-block">
          <span class="qc-config-label">优化目标</span>
          <div class="qc-segmented" role="group" aria-label="素材${escapeHtml(item.materialId)}优化目标">
            <button type="button" class="qc-segment-button ${config.objective === 'roi' ? 'active' : ''}" data-plan-objective-for="${escapeHtml(item.id)}" data-plan-objective="roi">综合ROI</button>
            <button type="button" class="qc-segment-button ${config.objective === 'transaction' ? 'active' : ''}" data-plan-objective-for="${escapeHtml(item.id)}" data-plan-objective="transaction">直播间成交</button>
          </div>
        </div>
        <div class="qc-config-grid controlled">
          <label class="qc-control-field"><span>调控日预算</span><div class="qc-input-unit"><i>¥</i><input type="number" min="1" step="100" value="${escapeHtml(config.dailyBudget)}" data-plan-id="${escapeHtml(item.id)}" data-plan-field="dailyBudget"></div></label>
          ${targetField}
        </div>
      </section>`;
  }

  function renderBatchTemplates() {
    const deliveryTypeLabel = batchDeliveryType === 'scale' ? '放量追投' : '控成本追投';
    document.getElementById('templateModalTitle').textContent = `批量创建${deliveryTypeLabel}（${selectedBatchRecommendations.length}）`;
    const selectedMaterial = document.getElementById('selectedMaterial');
    selectedMaterial.className = '';
    selectedMaterial.hidden = true;
    selectedMaterial.innerHTML = '';
    const templateSectionTitle = document.getElementById('templateSectionTitle');
    templateSectionTitle.hidden = true;
    templateSectionTitle.textContent = '';
    const batchTemplateFill = document.getElementById('batchTemplateFill');
    batchTemplateFill.hidden = selectedBatchRecommendations.length < 2;
    batchTemplateFill.innerHTML = selectedBatchRecommendations.length < 2 ? '' : `
      <span>批量填入计划</span>
      <select data-batch-template-fill aria-label="选择要批量填入的追投模版">${batchTemplateFillOptions(batchTemplateFillId, batchDeliveryType)}</select>
      <button type="button" class="qc-secondary-btn" id="applyBatchTemplate" ${batchTemplateFillId ? '' : 'disabled'}>填入全部</button>`;
    document.getElementById('templateList').innerHTML = selectedBatchRecommendations.map(item => `
      <article class="qc-batch-plan-row">
        <div class="qc-batch-material">
          <button type="button" class="qc-batch-cover-button qc-media-button" data-material-preview-cover="${escapeHtml(item.cover)}" data-material-preview-id="${escapeHtml(item.materialId)}" aria-label="播放素材"><img src="${escapeHtml(item.cover)}" alt="素材封面"><span class="qc-record-play">▶</span></button>
          <button type="button" class="qc-batch-product-image-button qc-media-button" data-product-preview="${escapeHtml(item.cover)}" aria-label="放大商品主图"><img class="qc-batch-product-image" src="${escapeHtml(item.cover)}" alt="商品主图" title="商品主图"></button>
          <div class="qc-batch-template-copy"><span class="qc-material-tag ${escapeHtml(item.priority)}">${escapeHtml(item.tag)}</span></div>
        </div>
        <div class="qc-plan-config">${renderPlanFields(item)}</div>
      </article>`).join('');
    const modalNote = document.getElementById('templateModalNote');
    modalNote.classList.remove('error');
    modalNote.textContent = `确认后将一次创建 ${selectedBatchRecommendations.length} 个千川计划。创建期间请勿重复点击。`;
    document.getElementById('confirmCreatePlan').textContent = `确认创建 ${selectedBatchRecommendations.length} 个计划`;
  }

  function openBatchTemplateModal(deliveryType) {
    selectedBatchRecommendations = recommendations.filter(item => item.deliveryType === deliveryType && selectedRecommendationIds.has(item.id));
    if (!selectedBatchRecommendations.length) {
      showToast('请先选择要创建的推荐计划');
      return;
    }
    batchDeliveryType = deliveryType;
    batchPlanConfigs = Object.fromEntries(selectedBatchRecommendations.map(item => [item.id, defaultPlanConfig(item, deliveryType)]));
    batchTemplateFillId = '';
    renderBatchTemplates();
    modalMask.classList.add('open');
  }

  function closeTemplateModal() {
    if (creating) return;
    modalMask.classList.remove('open');
    selectedBatchRecommendations = [];
    batchPlanConfigs = {};
    batchTemplateFillId = '';
    batchDeliveryType = '';
  }

  function createPlan() {
    if (creating) return;
    const targets = selectedBatchRecommendations;
    if (!targets.length) return;
    const missingTemplateSelection = targets.find(item => !batchPlanConfigs[item.id]?.templateId);
    if (missingTemplateSelection) {
      const modalNote = document.getElementById('templateModalNote');
      modalNote.textContent = `请选择素材ID「${displayMaterialId(missingTemplateSelection.materialId)}」的追投模版，或选择手动创建。`;
      modalNote.classList.add('error');
      return;
    }
    const invalidTarget = targets.find(item => {
      const config = batchPlanConfigs[item.id];
      if (!config) return true;
      if (config.mode === 'scale') return Number(config.budget) <= 0 || Number(config.duration) <= 0;
      if (Number(config.dailyBudget) <= 0) return true;
      return config.objective === 'roi' ? Number(config.roiTarget) <= 0 : Number(config.bid) <= 0;
    });
    if (invalidTarget) {
      const modalNote = document.getElementById('templateModalNote');
      modalNote.textContent = `请完整填写素材ID「${displayMaterialId(invalidTarget.materialId)}」的追投参数。`;
      modalNote.classList.add('error');
      return;
    }
    creating = true;
    const createButton = document.getElementById('confirmCreatePlan');
    createButton.disabled = true;
    createButton.innerHTML = '<span class="qc-spin"></span>正在创建';

    window.setTimeout(() => {
      const newDeliveryTemplates = targets.flatMap((recommendation, index) => {
        const config = batchPlanConfigs[recommendation.id];
        if (config.templateId !== '__manual__' || !config.saveAsTemplate) return [];
        return [{
          id: `delivery-${Date.now()}-${index}`,
          name: generatedTemplateName(config),
          mode: config.mode,
          budget: Number(config.budget),
          duration: Number(config.duration),
          objective: config.objective,
          dailyBudget: Number(config.dailyBudget),
          roiTarget: Number(config.roiTarget),
          bid: Number(config.bid),
          createdAt: '刚刚'
        }];
      });
      if (newDeliveryTemplates.length) deliveryTemplates.unshift(...newDeliveryTemplates);
      const createdIds = new Set(targets.map(item => item.id));
      recommendations = recommendations.filter(item => !createdIds.has(item.id));
      selectedRecommendationIds = new Set([...selectedRecommendationIds].filter(id => !createdIds.has(id)));
      creating = false;
      createButton.disabled = false;
      createButton.textContent = '确认创建计划';
      modalMask.classList.remove('open');
      selectedBatchRecommendations = [];
      batchPlanConfigs = {};
      batchDeliveryType = '';
      renderSuggestions();
      openTab('suggestions');
      showToast(targets.length > 1 ? `已成功创建 ${targets.length} 个计划` : '计划创建成功');
    }, 850);
  }

  board.addEventListener('click', event => {
    const tab = event.target.closest('[data-qc-tab]');
    if (tab) {
      openTab(tab.dataset.qcTab);
      return;
    }

    if (event.target.closest('#settingsToggle')) {
      if (activeTab === 'settings') openTab('suggestions');
      else {
        renderTemplateManager();
        openTab('settings');
      }
      return;
    }

    if (event.target.closest('#closeBoard')) {
      board.classList.remove('open');
      return;
    }

    const suggestionDeliveryType = event.target.closest('[data-suggestion-delivery-type]');
    if (suggestionDeliveryType) {
      activeSuggestionDeliveryType = suggestionDeliveryType.dataset.suggestionDeliveryType;
      renderSuggestions();
      return;
    }

    const recommendationCard = event.target.closest('[data-recommendation-id]');
    if (recommendationCard) {
      const id = recommendationCard.dataset.recommendationId;
      if (selectedRecommendationIds.has(id)) selectedRecommendationIds.delete(id);
      else selectedRecommendationIds.add(id);
      renderSuggestions();
      return;
    }

    const recommendationGroupSelectAll = event.target.closest('[data-select-recommendation-group]');
    if (recommendationGroupSelectAll) {
      const group = recommendationGroupSelectAll.dataset.selectRecommendationGroup;
      const items = recommendations.filter(item => item.deliveryType === group);
      const allSelected = items.length > 0 && items.every(item => selectedRecommendationIds.has(item.id));
      items.forEach(item => {
        if (allSelected) selectedRecommendationIds.delete(item.id);
        else selectedRecommendationIds.add(item.id);
      });
      renderSuggestions();
      return;
    }

    const batchCreateGroup = event.target.closest('[data-batch-create-group]');
    if (batchCreateGroup) {
      openBatchTemplateModal(batchCreateGroup.dataset.batchCreateGroup);
      return;
    }

    const replacementCard = event.target.closest('[data-replacement-material-id]');
    if (replacementCard) {
      const materialId = replacementCard.dataset.replacementMaterialId;
      if (selectedReplacementMaterialIds.has(materialId)) selectedReplacementMaterialIds.delete(materialId);
      else selectedReplacementMaterialIds.add(materialId);
      renderReplacementMaterials();
      return;
    }

    if (event.target.closest('#selectAllReplacement')) {
      const allSelected = replacementMaterials.length > 0 && selectedReplacementMaterialIds.size === replacementMaterials.length;
      selectedReplacementMaterialIds = allSelected ? new Set() : new Set(replacementMaterials.map(item => item.materialId));
      renderReplacementMaterials();
      return;
    }

    if (event.target.closest('#batchReplaceMaterials')) {
      openMaterialActionConfirm('replace');
      return;
    }

    const recallCard = event.target.closest('[data-recall-material-id]');
    if (recallCard) {
      const materialId = recallCard.dataset.recallMaterialId;
      if (selectedRecallMaterialIds.has(materialId)) selectedRecallMaterialIds.delete(materialId);
      else selectedRecallMaterialIds.add(materialId);
      renderRecallMaterials();
      return;
    }

    if (event.target.closest('#selectAllRecall')) {
      const allSelected = recallableMaterials.length > 0 && selectedRecallMaterialIds.size === recallableMaterials.length;
      selectedRecallMaterialIds = allSelected ? new Set() : new Set(recallableMaterials.map(item => item.materialId));
      renderRecallMaterials();
      return;
    }

    if (event.target.closest('#batchRecallMaterials')) {
      openMaterialActionConfirm('recall');
      return;
    }

    const newManagedTemplate = event.target.closest('[data-new-managed-template]');
    if (newManagedTemplate) {
      openTemplateManagerModal(newManagedTemplate.dataset.newManagedTemplate);
      return;
    }

    const editManagedTemplate = event.target.closest('[data-edit-managed-template]');
    if (editManagedTemplate) {
      const [kind, id] = editManagedTemplate.dataset.editManagedTemplate.split(':');
      openTemplateManagerModal(kind, id);
      return;
    }

    const deleteManagedTemplateButton = event.target.closest('[data-delete-managed-template]');
    if (deleteManagedTemplateButton) {
      const [kind, id] = deleteManagedTemplateButton.dataset.deleteManagedTemplate.split(':');
      openTemplateDeleteConfirm(kind, id);
      return;
    }

  });

  board.addEventListener('keydown', event => {
    const card = event.target.closest('[data-recommendation-id], [data-replacement-material-id], [data-recall-material-id]');
    if (!card || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    card.click();
  });

  board.addEventListener('change', event => {
    const autoMaterialScreening = event.target.closest('[data-auto-material-screening]');
    if (!autoMaterialScreening) return;
    autoMaterialScreeningEnabled = autoMaterialScreening.checked;
    renderTemplateManager();
    showToast(autoMaterialScreeningEnabled ? '已开启素材库自动筛选' : '已关闭素材库自动筛选');
  });

  document.getElementById('closeTemplateModal').addEventListener('click', closeTemplateModal);
  document.getElementById('cancelTemplateModal').addEventListener('click', closeTemplateModal);
  document.getElementById('confirmCreatePlan').addEventListener('click', createPlan);
  modalMask.addEventListener('click', event => {
    const applyBatchTemplate = event.target.closest('#applyBatchTemplate');
    if (applyBatchTemplate && batchTemplateFillId) {
      Object.values(batchPlanConfigs).forEach(config => applyDeliveryTemplate(config, batchTemplateFillId));
      renderBatchTemplates();
      showToast(`已将追投模版填入 ${selectedBatchRecommendations.length} 个素材`);
      return;
    }

    const modeButton = event.target.closest('[data-plan-mode-for]');
    if (modeButton) {
      batchPlanConfigs[modeButton.dataset.planModeFor].mode = modeButton.dataset.planMode;
      renderBatchTemplates();
      return;
    }

    const objectiveButton = event.target.closest('[data-plan-objective-for]');
    if (objectiveButton) {
      batchPlanConfigs[objectiveButton.dataset.planObjectiveFor].objective = objectiveButton.dataset.planObjective;
      renderBatchTemplates();
      return;
    }

    if (event.target === modalMask) closeTemplateModal();
  });

  function updatePlanField(event) {
    const batchTemplateFillControl = event.target.closest('[data-batch-template-fill]');
    if (batchTemplateFillControl) {
      batchTemplateFillId = batchTemplateFillControl.value;
      renderBatchTemplates();
      return;
    }
    const templateControl = event.target.closest('[data-plan-template-for]');
    if (templateControl) {
      const config = batchPlanConfigs[templateControl.dataset.planTemplateFor];
      if (!config) return;
      if (templateControl.value === '__manual__') {
        config.templateId = '__manual__';
        config.saveAsTemplate = true;
      } else if (templateControl.value) {
        applyDeliveryTemplate(config, templateControl.value);
      } else {
        config.templateId = '';
        config.saveAsTemplate = false;
      }
      renderBatchTemplates();
      return;
    }
    const control = event.target.closest('[data-plan-id][data-plan-field]');
    if (!control) return;
    const config = batchPlanConfigs[control.dataset.planId];
    if (!config) return;
    const field = control.dataset.planField;
    config[field] = control.type === 'checkbox' ? control.checked : control.value;
    if (field === 'saveAsTemplate') {
      renderBatchTemplates();
      return;
    }
    document.getElementById('templateModalNote').classList.remove('error');
  }

  modalMask.addEventListener('input', updatePlanField);
  modalMask.addEventListener('change', updatePlanField);

  templateManagerModalMask.addEventListener('click', event => {
    const managedModeButton = event.target.closest('[data-managed-mode]');
    if (managedModeButton && templateManagerDraft) {
      templateManagerDraft.data.mode = managedModeButton.dataset.managedMode;
      renderTemplateManagerModal();
      return;
    }
    const managedObjectiveButton = event.target.closest('[data-managed-objective]');
    if (managedObjectiveButton && templateManagerDraft) {
      templateManagerDraft.data.objective = managedObjectiveButton.dataset.managedObjective;
      renderTemplateManagerModal();
      return;
    }
    if (event.target === templateManagerModalMask || event.target.closest('[data-close-template-manager]')) {
      closeTemplateManagerModal();
      return;
    }
    if (event.target.closest('#saveManagedTemplate')) saveManagedTemplate();
  });

  function updateManagedTemplateField(event) {
    const control = event.target.closest('[data-managed-field]');
    if (!control || !templateManagerDraft) return;
    templateManagerDraft.data[control.dataset.managedField] = control.value;
    if (control.dataset.managedField === 'mode' || control.dataset.managedField === 'objective') renderTemplateManagerModal();
  }

  templateManagerModalMask.addEventListener('input', updateManagedTemplateField);
  templateManagerModalMask.addEventListener('change', updateManagedTemplateField);

  templateDeleteConfirmMask.addEventListener('click', event => {
    if (event.target === templateDeleteConfirmMask || event.target.closest('[data-close-template-delete]')) {
      closeTemplateDeleteConfirm();
      return;
    }
    if (event.target.closest('[data-confirm-template-delete]') && pendingTemplateDeletion) {
      const { kind, id } = pendingTemplateDeletion;
      deleteManagedTemplate(kind, id);
      closeTemplateDeleteConfirm();
    }
  });

  materialActionConfirmMask.addEventListener('click', event => {
    if (event.target === materialActionConfirmMask || event.target.closest('[data-close-material-action]')) {
      closeMaterialActionConfirm();
      return;
    }
    if (event.target.closest('#confirmMaterialAction')) {
      const action = pendingMaterialAction;
      closeMaterialActionConfirm();
      if (action === 'recall') recallSelectedMaterials();
      if (action === 'replace') replaceSelectedMaterials();
    }
  });

  renderSuggestions();
  renderReplacementMaterials();
  renderRecallMaterials();
  renderTemplateManager();
  openTab(activeTab);
  board.classList.add('open');
})();
