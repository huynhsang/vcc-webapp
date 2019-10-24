import {
    css,
    BaseThemedCssFunction,
    SimpleInterpolation,
    CSSObject
} from 'styled-components';
/**
 * Get color (black/white) depending on bgColor so it would be clearly seen.
 * @param bgColor
 * @returns {string}
 */
export function getColorByBgColor(bgColor: string) {
    if (!bgColor) {
        return '';
    }
    return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2
        ? '#000'
        : '#ffffff';
}

type ScreenSizeMap = {
    [screen: string]: {
        minWidth: number;
        maxWidth?: number;
        orientation?: string;
    };
};

type MediaTemplateMap = {
    [screen: string]: BaseThemedCssFunction<any>;
};

const defaultScreenSizes: ScreenSizeMap = {
    tabletLandscape: {
        minWidth: 0,
        maxWidth: 700,
    },
};

/**
 * Creates a Media template map that can be used in a Styled component by adding
 * ${media.SCREEN_SIZE_LABEL`YOUR_CSS_HERE`} in a given styled component definition
 */
export function createMediaTemplate(
    sizes: ScreenSizeMap = defaultScreenSizes
): MediaTemplateMap {
    return Object.keys(sizes).reduce((acc: MediaTemplateMap, label: string) => {
        acc[label] = ((
            first: CSSObject | TemplateStringsArray,
            ...interpol: SimpleInterpolation[]
        ) => {
            const screenSize = sizes[label];
            let mediaString = `(min-width: ${screenSize.minWidth / 16}em)`;

            if (screenSize.maxWidth) {
                mediaString += ` and (max-width: ${screenSize.maxWidth /
                    16}em)`;
            }

            if (screenSize.orientation != null) {
                mediaString += ` and (orientation: ${screenSize.orientation})`;
            }

            return css`
                @media ${mediaString} {
                    ${css(first, ...interpol)}
                }
            `;
        });
        return acc;
    }, {});
}
