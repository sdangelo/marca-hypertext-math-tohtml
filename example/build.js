#!/usr/bin/env node

var fs = require("fs");

var opt = {
	mathMetrics:
	{
		regular: JSON.parse(fs.readFileSync("xits-regular.mtx.json", "utf8")),
		italic: JSON.parse(fs.readFileSync("xits-italic.mtx.json", "utf8")),
		bold: JSON.parse(fs.readFileSync("xits-bold.mtx.json", "utf8")),
		boldItalic: JSON.parse(fs.readFileSync("xits-bolditalic.mtx.json", "utf8"))
	}
};

var Marca = require("marca");
require("marca-hypertext")(Marca);
require("marca-hypertext-tohtml")(Marca);
require("marca-math")(Marca);
var Kroton = require("kroton");
require("marca-math-tokroton")(Marca, Kroton);
require("kroton-shaper")(Kroton);
require("kroton-tosvg")(Kroton);
require("marca-hypertext-math")(Marca);
require("../marca-hypertext-math-tohtml.js")(Marca);

var root = Marca.parse(fs.readFileSync("example.marca", "utf8"));
var dom = Object.create(Marca.DOMElementHypertextRoot);
dom.init(root, [Marca.HypertextElementProtos, Marca.MathElementProtos, Marca.HypertextMathElementProtos]);

fs.writeFileSync("example.html", dom.toHTML(0, opt));
