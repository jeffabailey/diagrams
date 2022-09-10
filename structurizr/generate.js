var ejs = require("ejs");
var fs = require("fs");

function generateHtmlPage(diagramKey) {
  try {

    var diagramSvgMarkup = fs.readFileSync(
      `structurizr-${diagramKey}.svg`,
      "utf-8"
    );
    var diagramKeySvgMarkup = fs.readFileSync(
      `structurizr-${diagramKey}-key.svg`,
      "utf-8"
    );

    var template = fs.readFileSync("./template.ejs", "utf-8");
    var html = ejs.render(template, {
      diagramKey,
      diagramSvgMarkup,
      diagramKeySvgMarkup,
    });

    var filename = diagramKey + ".html";
    fs.writeFileSync(`./${filename}`, html, "utf8");
  } catch (e) {
    console.log(e); // If any error is thrown, you can see the message.
  }
}

function generateHtmlPages() {
  let diagramKeys = []
  fs.readdirSync('.').forEach(file => {
    if(file.startsWith('structurizr-') && file.endsWith('.svg') && !file.endsWith('-key.svg')) {
      diagramKeys.push(file.substring(12, file.length - 4))
    }
  });

  console.log('diagramKeys', diagramKeys);

  diagramKeys.forEach(diagramKey => {
    generateHtmlPage(diagramKey);
  });
  return true;
}

export { generateHtmlPage, generateHtmlPages };
