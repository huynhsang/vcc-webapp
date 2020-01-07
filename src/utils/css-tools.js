import { css } from 'styled-components';

const defaultScreenSizes = {
    tabletLandscape: { maxWidth: 1024 },
    mobileLandscape: { maxWidth: 768 }, // Also works for low res tablets
    mobile: { maxWidth: 480 }
};

/**
 * Creates a Media template map that can be used in a Styled component by adding
 * ${media.SCREEN_SIZE_LABEL`YOUR_CSS_HERE`} in a given styled component definition
 */
export function createMediaTemplate(sizes = defaultScreenSizes) {
    return Object.keys(sizes).reduce((acc, label) => {
        acc[label] = (first, ...interpol) => {
            const screenSize = sizes[label];
            let mediaString = `(max-width: ${screenSize.maxWidth / 16}em)`;

            if (screenSize.orientation != null) {
                mediaString += ` and (orientation: ${screenSize.orientation})`;
            }

            return css`
                @media ${mediaString} {
                    ${css(first, ...interpol)}
                }
            `;
        };
        return acc;
    }, {});
}
