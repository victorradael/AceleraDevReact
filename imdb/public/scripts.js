const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme]");

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style);

const inicialColors = {
  background: getStyle(html, "--background"),
  backgroundCard: getStyle(html, "--background-card"),
  colorHeadings: getStyle(html, "--color-headings"),
  colorText: getStyle(html, "--color-text"),
  filmeNota: getStyle(html, "--filme-nota"),
  colorInput: getStyle(html, "--color-input"),
};

const darkMode = {
  background: "#333",
  backgroundCard: "#434343",
  colorHeadings: "#e4bb23",
  colorText: "#b5b5b5",
  filmeNota: "#e4bb23",
  colorInput:"#333"
};

const transformKey = (key) => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map((key) =>
    html.style.setProperty(transformKey(key), colors[key])
  );
};

checkbox.addEventListener("change", ({ target }) => {
  target.checked ? changeColors(darkMode) : changeColors(inicialColors);
});
