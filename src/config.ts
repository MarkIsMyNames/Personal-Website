import { HtmlTag, HtmlAttr, AriaRole, SectionId, LinkRel, LinkTarget } from './types';

// Navigation
export const NAV_SCROLL_TOP_THRESHOLD = 10;
export const NAV_CLICK_SCROLL_LOCK_MS = 1000;
export const SCROLL_TOP_ZERO = 0;

// Gestures
export const SWIPE_THRESHOLD_PX = 50;

// Icons
export const SKILL_ICON_SIZE = 50;
export const CONTACT_ICON_SIZE = 24;
export const ICON_EMAIL = 'FaEnvelope';
export const ICON_GITHUB = 'FaGithub';

// Images
export const PROJECT_IMAGE_HEIGHT = 300;
export const KIB_CONVERSION_FACTOR = 1024;
export const MAX_IMAGE_SIZE_BYTES = 120 * KIB_CONVERSION_FACTOR;
export const MAX_IMAGE_SIZE_KIB = MAX_IMAGE_SIZE_BYTES / KIB_CONVERSION_FACTOR;

// Text
export const BIO_SENTENCE_DELIMITER = /(?<=\.) /;

// Indices and counts
export const FOCUSABLE_TAB_INDEX = 0;
export const DISPLAY_INDEX_OFFSET = 1;
export const FIRST_INDEX = 0;
export const PATH_LANG_SEGMENT = 1;
export const SINGLE_ITEM_COUNT = 1;
export const NO_MOVEMENT = 0;

// External links
export const GITHUB_BASE_URL = 'https://github.com/';
export const MAILTO_PREFIX = 'mailto:';
export const PRODUCTION_BASE_URL = 'https://markdrohan.vercel.app';

// Routing
export const ROOT_PATH = '/';
export const DEFAULT_LANG_CODE = 'en';
export const E2E_DEFAULT_LANG_PATH = `${ROOT_PATH}${DEFAULT_LANG_CODE}`;
export const SLASH_PATH_SPLIT = '/';
export const STAR_PATH = '*';

// SEO / hreflang
export const META_DESCRIPTION = 'description';

// HTML / DOM
export const ROOT_ELEMENT_ID = 'root';
export const CHARSET_UTF8 = 'utf-8';

// Static asset paths
export const FAVICON_PATH = '/favicon.svg';
export const ENTRY_POINT_PATH = '/src/index.tsx';

// Modal button symbols
export const CLOSE_SYMBOL = '✕';
export const PREV_SYMBOL = '‹';
export const NEXT_SYMBOL = '›';

// i18n
export const LOCALE_SEPARATOR = '-';
export const I18N_KEY_SEPARATOR = '.';
export const I18N_TRANSLATION_NAMESPACE = 'translation';
export const I18N_CHANGE_LANGUAGE = 'changeLanguage';
export const I18N_RETURN_OBJECTS_OPTION = 'returnObjects';
export const I18N_PLUGIN_TYPE = '3rdParty';

// Test — WCAG colour contrast (sRGB formulae per WCAG 2.1)
export const WCAG_AA_LARGE_TEXT_MIN_RATIO = 3;
export const WCAG_LUMINANCE_OFFSET = 0.05;
export const WCAG_RED_COEFFICIENT = 0.2126;
export const WCAG_GREEN_COEFFICIENT = 0.7152;
export const WCAG_BLUE_COEFFICIENT = 0.0722;
export const SRGB_LINEARIZATION_THRESHOLD = 0.04045;
export const SRGB_LINEARIZATION_DIVISOR = 12.92;
export const SRGB_GAMMA_ADDEND = 0.055;
export const SRGB_GAMMA_DIVISOR = 1.055;
export const SRGB_GAMMA_EXPONENT = 2.4;
export const HEX_PREFIX = '0x';
export const HEX_CHANNEL_MAX_VALUE = 255;
export const HEX_R_START = 1;
export const HEX_R_END = 3;
export const HEX_G_START = 3;
export const HEX_G_END = 5;
export const HEX_B_START = 5;
export const HEX_B_END = 7;

// Test — assertion messages
export const PUBLIC_DIR = 'public';
export const MSG_MUST_BE_NON_EMPTY = 'must be non-empty';
export const MSG_KIB_LIMIT_SUFFIX = ' KiB — must be under';
export const MSG_SKILL_AT_INDEX = 'skill at index';
export const MSG_KEYS_MISSING_FROM = 'Keys missing from';
export const MSG_EXTRA_KEYS_IN = 'Extra keys in';
export const MSG_NOT_IN_DEFAULT_LOCALE = 'not in the default locale';
export const INDEX_HTML_RELATIVE_PATH = '../../index.html';
export const MSG_PROJECT = 'project';
export const KIB_UNIT = 'KiB';
export const MSG_IS_UNDER = 'is under';

// Test — locale
export const UNSUPPORTED_LANG_CODE = 'ffasdf';
export const TEST_LANG_EN = 'en';
export const TEST_LANG_FR = 'fr';
export const TEST_LANG_DE = 'de';
export const TEST_LANG_ES = 'es';
export const TEST_LANG_GA = 'ga';
export const TEST_LOCALE_EN_US = 'en-US';
export const TEST_LOCALE_FR_FR = 'fr-FR';
export const TEST_LOCALE_DE_DE = 'de-DE';
export const TEST_LOCALE_ES_ES = 'es-ES';
export const TEST_LOCALE_GA_IE = 'ga-IE';
export const TEST_LOCALE_UNSUPPORTED = 'ffasdf';

// Test — mock values
export const LOCALE_FILE_EXTENSION = '.json';
export const IMAGE_INDEX_FIRST = '1';
export const IMAGE_INDEX_SECOND = '2';
export const REGEX_FLAG_CASE_INSENSITIVE = 'i';
export const MOCK_RECT_ZERO = 0;
export const MOCK_RECT_TOP = 100;
export const MOCK_RECT_HEIGHT = 100;
export const TEST_IMAGE_URL = 'test-image.jpg';
export const TEST_IMAGE_ALT = 'Test Image';
export const WINDOW_PROP_SCROLL_Y = 'scrollY';
export const NAV_TRANSFORM_HIDDEN = 'transform: translateY(-100%)';
export const NAV_TRANSFORM_VISIBLE = 'transform: translateY(0)';
export const SCROLL_Y = { BELOW_THRESHOLD: 5, LOW: 100, MID: 200, HIGH: 300 } as const;
export const TOUCH_X = { LOW: 100, BELOW_THRESHOLD: 180, MID: 200, HIGH: 300 } as const;
export const SINGLE_CALL = 1;
export const EMPTY_LENGTH = 0;
export const EMPTY_STRING = '';
export const UNKNOWN_ICON_NAME = 'UnknownIcon';

// E2E — scroll positions
export const E2E_SCROLL = { X: 0, DOWN_Y: 600, MID_Y: 400, TOP_THRESHOLD: 50 } as const;

// E2E — timeouts
export const E2E_SCROLL_WAIT_TIMEOUT_MS = 5000;

// E2E — viewport
export const E2E_MOBILE_VIEWPORT_WIDTH = 480;
export const E2E_MOBILE_VIEWPORT_HEIGHT = 844;
export const E2E_MIN_TOUCH_TARGET_PX = 44;
export const E2E_VIEWPORT_RATIO = 0.05;

// E2E — section anchors
export const E2E_SECTION_ABOUT = `#${SectionId.About}`;
export const E2E_SECTION_SKILLS = `#${SectionId.Skills}`;
export const E2E_SECTION_PROJECTS = `#${SectionId.Projects}`;
export const E2E_SECTION_CONTACT = `#${SectionId.Contact}`;

// E2E — CSS selectors
export const E2E_SELECTOR_EXTERNAL_LINK = `${HtmlTag.A}[${HtmlAttr.Target}="${LinkTarget.Blank}"]`;
export const E2E_ABOUT_IMG_SELECTOR = `${E2E_SECTION_ABOUT} ${HtmlTag.Img}`;
export const E2E_PROJECTS_IMG_SELECTOR = `${E2E_SECTION_PROJECTS} ${HtmlTag.Img}`;
export const E2E_PROJECTS_BUTTON_SELECTOR = `${E2E_SECTION_PROJECTS} [role="${AriaRole.Button}"]`;
export const E2E_PROJECTS_LISTITEM_SELECTOR = `${E2E_SECTION_PROJECTS} [role="${AriaRole.ListItem}"]`;
export const E2E_LISTITEM_BUTTON_SELECTOR = `[role="${AriaRole.Button}"]`;
export const E2E_LISTITEM_BUTTON_NTH_SELECTOR = `[role="${AriaRole.Button}"]:nth-child(2)`;
export const E2E_SKILLS_LISTITEM_SELECTOR = `${E2E_SECTION_SKILLS} [role="${AriaRole.ListItem}"]`;
export const E2E_SKILLS_SVG_SELECTOR = `${E2E_SECTION_SKILLS} ${HtmlTag.Svg}`;
export const E2E_META_DESCRIPTION_SELECTOR = `${HtmlTag.Meta}[${HtmlAttr.Name}="${META_DESCRIPTION}"]`;
export const E2E_FAVICON_SELECTOR = `${HtmlTag.Link}[${HtmlAttr.Rel}="${LinkRel.Icon}"]`;
export const E2E_CONTACT_EMAIL_SELECTOR = `${E2E_SECTION_CONTACT} ${HtmlTag.A}[${HtmlAttr.Href}^="${MAILTO_PREFIX}"]`;
export const E2E_CONTACT_GITHUB_SELECTOR = `${E2E_SECTION_CONTACT} ${HtmlTag.A}[${HtmlAttr.Href}*="${GITHUB_BASE_URL}"]`;
export const E2E_INTERACTIVE_SELECTORS = [
  `${HtmlTag.A}[${HtmlAttr.Href}]`,
  HtmlTag.Button,
  `[role="${AriaRole.Button}"][${HtmlAttr.TabIndex}="${FOCUSABLE_TAB_INDEX}"]`,
] as const;

// E2E — gallery scroll
export const E2E_GALLERY_SCROLL = { PX: 200 } as const;

// E2E — click and swipe positions
export const E2E_MODAL_OUTSIDE_CLICK_X = 10;
export const E2E_MODAL_OUTSIDE_CLICK_Y = 10;
export const E2E_SWIPE = { START_X: 300, END_X: 50 } as const;

// E2E — assertion patterns
export const E2E_REGEX_ANY_TEXT = /.+/;
export const E2E_NOOPENER_PATTERN = /noopener/;
export const E2E_FAVICON_PATTERN = /favicon/;
export const E2E_ARIA_HIDDEN_TRUE = 'true' as const;

// E2E — test description text
export const E2E_NAV_SCROLL_TEST_PREFIX = 'scrolls to';
export const E2E_NAV_SCROLL_TEST_SUFFIX = 'section when nav link clicked';
export const E2E_ROUTE_RENDERS_AT = 'renders page at';
export const E2E_KEYBOARD_OPEN_TEST_PREFIX = 'is keyboard accessible — opens with';
export const E2E_KEYBOARD_OPEN_TEST_SUFFIX = 'key';

// Storybook visual tests
export const STORYBOOK_INDEX_PATH = '/index.json';
export const STORYBOOK_LOAD_STATE = 'networkidle';
export const STORYBOOK_IFRAME_PREFIX = '/iframe.html?id=';
export const STORYBOOK_IFRAME_SUFFIX = '&viewMode=story';
export const STORYBOOK_SNAPSHOT_EXT = '.png';
