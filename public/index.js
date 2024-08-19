// default to smile
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
addButtonListeners();
document.getElementById("extension-form").onsubmit = (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    // Get the current selected Element
    const el = yield webflow.getSelectedElement();
    // If styles can be set on the Element
    if (el && el.styles && el.children) {
        //Get current element's style
        const currentStyle = yield el.getStyles();
        // Get style
        const emojiStyle = yield createOrUseStyle("emoji-style");
        // Create a new element that will display the text-emoji
        const labelElement = yield el.append(webflow.elementPresets.DOM);
        yield labelElement.setTag("span");
        yield labelElement.setStyles([...currentStyle, emojiStyle]);
    }
    else {
        alert("Please select a text element");
    }
});
// Check if specified style exists. If not, create a new style
function createOrUseStyle(styleName) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if this style exists to avoid duplicate styles
        const style = yield webflow.getStyleByName(styleName);
        if (style) {
            // Return existing style
            return style;
        }
        else {
            // Create a new style, return it
            const emojiStyle = yield webflow.createStyle(styleName);
            yield emojiStyle.setProperties({ "background-color": "#FF00FF" });
            return emojiStyle;
        }
    });
}
function addButtonListeners() {
    document.getElementById("smile").onclick = (event) => __awaiter(this, void 0, void 0, function* () {
        // Prevent the default form submission behavior, which would reload the page
        event.preventDefault();
        // Get the currently selected element in the Designer
        const el = yield webflow.getSelectedElement();
        // Check if an element was returned, and the element can contain text content
        if (el === null || el === void 0 ? void 0 : el.children) {
            // If we found the element and it has the ability to update the text content,
            // replace it with some placeholder text
            // Insert DIV before selected Element
            const newHeader = yield (el === null || el === void 0 ? void 0 : el.append(webflow.elementPresets.Heading));
            yield newHeader.setTextContent("Hello World");
        }
        else {
            yield webflow.notify({
                type: "Error",
                message: "Please select an element that contains text.",
            });
        }
    });
}
