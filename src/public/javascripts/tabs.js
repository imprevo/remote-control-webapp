function initTabs() {
  const ACTIVE_CLASS = 'active';
  const tabNavs = document.querySelectorAll('.tab-nav');
  const tabs = [...document.querySelectorAll('.tab')];
  let currentTabButton;
  let currentTabContent;

  function updateTab(nextTab) {
    currentTabButton?.classList.remove(ACTIVE_CLASS);
    currentTabContent?.classList.remove(ACTIVE_CLASS);

    currentTabButton = nextTab;
    currentTabContent = tabs.find(
      (tab) => tab.dataset.tab === nextTab.dataset.tab
    );

    currentTabButton.classList.add(ACTIVE_CLASS);
    currentTabContent.classList.add(ACTIVE_CLASS);
  }

  tabNavs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      updateTab(e.target);
    });
  });

  updateTab(tabNavs[0]);
}

initTabs();
