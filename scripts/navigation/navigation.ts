/**
 * Project structure in the project map
 */
interface Project {
  path: string;
}

// Centralized project list with full URL paths
const projectMap: Project[] = [
  { path: 'projects/pages/market-brief/' },
  { path: 'projects/pages/perks-ffa/' },
  { path: 'projects/pages/bullseye/' },
  { path: 'projects/pages/myolog/' },
  { path: 'projects/pages/code-scout/' },
  { path: 'projects/pages/options-pricer/' },
  { path: 'projects/pages/pickaxe-knockout/' },
  { path: 'projects/pages/endzone-analytics/' }
];

/**
 * Navigates to a project using full URLs
 * @param index - Index in the projectMap array
 */
function goToProject(index: number): void {
  const project: Project | undefined = projectMap[index];
  if (project) {
    window.location.href = '/' + project.path;
  }
}

/**
 * Gets the current project index based on the URL path
 * @returns Current project index, or -1 if not found
 */
function getCurrentProjectIndex(): number {
  const currentPath: string = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  return projectMap.findIndex((p: Project): boolean => 
    p.path.replace(/\/+$/, '') === currentPath
  );
}

/**
 * Enables or disables a navigation button based on index bounds
 * @param button - The navigation button element
 * @param isActive - Whether the button should be enabled
 * @param handler - The function to call on click
 */
function configureNavButton(
  button: Element | null,
  isActive: boolean,
  handler: () => void
): void {
  if (!button) return;

  const newButton: Node = button.cloneNode(true);
  const parentNode = button.parentNode;
  
  if (!parentNode) return;
  
  parentNode.replaceChild(newButton, button);

  const element = newButton as HTMLElement;

  if (isActive) {
    element.classList.remove('disabled');
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
    element.addEventListener('click', handler);
  } else {
    element.classList.add('disabled');
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
  }
}

/**
 * Maps grid project cards to detail page clicks
 */
export function projectLinksInit(): void {
  const buttons: NodeListOf<Element> = document.querySelectorAll('.project-card-cta');

  buttons.forEach((btn: Element, index: number): void => {
    btn.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      e.stopPropagation();
      goToProject(index);
    });
  });
}

/**
 * Initializes navigation buttons on project pages
 */
export async function projectPageNavigationInit(): Promise<void> {
  const currentIndex: number = getCurrentProjectIndex();

  if (currentIndex === -1) return;

  const lastBtn: Element | null = document.querySelector('.project-navigation-last');
  const nextBtn: Element | null = document.querySelector('.project-navigation-next');

  configureNavButton(lastBtn, currentIndex > 0, (): void => goToProject(currentIndex - 1));
  configureNavButton(nextBtn, currentIndex < projectMap.length - 1, (): void => goToProject(currentIndex + 1));
}

/**
 * Gets the project name from the current URL for data loading
 * @returns Project name/folder
 */
export function getProjectName(): string {
  const path: string = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  const pathMatch: RegExpMatchArray | null = path.match(/^projects\/pages\/([^\/]+)/);
  if (pathMatch) {
    return pathMatch[1];
  }

  const filename: string = path.split('/').pop() || '';
  return filename.replace('.html', '');
}

/**
 * Determines if the current page is the home page
 * @returns True if this is the home page, false otherwise
 */
export function isHomePage(): boolean {
  const homeElements: string[] = [
    '#projects',
    '.project-card'
  ];

  const hasHomeElements: boolean = homeElements.some((selector: string): boolean =>
    document.querySelector(selector) !== null
  );

  const projectElements: string[] = [
    '.project-container',
    '.project-hero',
    '.project-overview'
  ];

  const hasProjectElements: boolean = projectElements.some((selector: string): boolean =>
    document.querySelector(selector) !== null
  );

  return hasHomeElements && !hasProjectElements;
}