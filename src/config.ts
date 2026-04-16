// Navigation
export const NAV_SCROLL_TOP_THRESHOLD = 10;
export const NAV_CLICK_SCROLL_LOCK_MS = 1000;
export const SCROLL_BEHAVIOR = 'smooth';
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
export const FETCH_PRIORITY_HIGH = 'high';

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
export const EXTERNAL_LINK_REL = 'noopener noreferrer';
export const EXTERNAL_LINK_TARGET = '_blank';
export const PRODUCTION_BASE_URL = 'https://markdrohan.vercel.app';

// Routing
export const SLASH_PATH_SPLIT = '/';
export const STAR_PATH = '*';

// SEO / hreflang
export const HREFLANG_REL = 'alternate';
export const HREFLANG_X_DEFAULT = 'x-default';
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
export const HEX_CHANNEL_RADIX = 16;
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
export const TYPEOF_OBJECT = 'object';
export const TYPEOF_STRING = 'string';
export const INDEX_HTML_RELATIVE_PATH = '../../index.html';
export const MSG_PROJECT = 'project';
export const KIB_UNIT = 'KiB';
export const MSG_IS_UNDER = 'is under';

// Test — locale
export const UNSUPPORTED_LANG_CODE = 'ff';
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
export const TEST_LOCALE_UNSUPPORTED = 'ja-JP';

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
export const SCROLL_Y_BELOW_THRESHOLD_LOW = 5;
export const SCROLL_Y_BELOW_THRESHOLD_HIGH = 8;
export const SCROLL_Y_LOW = 100;
export const SCROLL_Y_MID = 200;
export const SCROLL_Y_HIGH = 300;
export const TOUCH_X_HIGH = 300;
export const TOUCH_X_MID = 200;
export const TOUCH_X_LOW = 100;
export const TOUCH_Y = 200;
export const TOUCH_BELOW_THRESHOLD_END_X = 180;
export const TOUCH_VERTICAL_START_Y = 100;
export const TOUCH_VERTICAL_END_X = 190;
export const TOUCH_VERTICAL_END_Y = 400;
export const SINGLE_CALL = 1;
export const EMPTY_LENGTH = 0;
export const UNKNOWN_ICON_NAME = 'UnknownIcon';
