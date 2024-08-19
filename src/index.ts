// default to smile

addButtonListeners();

document.getElementById("extension-form").onsubmit = async (event) => {
  event.preventDefault();
  // Get the current selected Element
  const el = await webflow.getSelectedElement();

  // If styles can be set on the Element
  if (el && el.styles && el.children) {
    //Get current element's style
    const currentStyle = await el.getStyles();

    // Get style
    const emojiStyle = await createOrUseStyle("emoji-style");

    // Create a new element that will display the text-emoji
    const labelElement = await el.append(webflow.elementPresets.DOM);
    await labelElement.setTag("span");
    await labelElement.setStyles([...currentStyle, emojiStyle]);
  } else {
    alert("Please select a text element");
  }
};

// Check if specified style exists. If not, create a new style
async function createOrUseStyle(styleName) {
  // Check if this style exists to avoid duplicate styles
  const style = await webflow.getStyleByName(styleName);
  if (style) {
    // Return existing style
    return style;
  } else {
    // Create a new style, return it
    const emojiStyle = await webflow.createStyle(styleName);
    await emojiStyle.setProperties({ "background-color": "#FF00FF" });
    return emojiStyle;
  }
}

function addButtonListeners() {
  document.getElementById("smile").onclick = async (event) => {
    // Prevent the default form submission behavior, which would reload the page
    event.preventDefault();

    // Get the currently selected element in the Designer
    const el = await webflow.getSelectedElement();
    // Check if an element was returned, and the element can contain text content
    if (el?.children) {
      // If we found the element and it has the ability to update the text content,
      // replace it with some placeholder text
      // Insert DIV before selected Element
      const newHeader = await el?.append(webflow.elementPresets.Heading);
      await newHeader.setTextContent("Hello World");
    } else {
      await webflow.notify({
        type: "Error",
        message: "Please select an element that contains text.",
      });
    }
  };
}
