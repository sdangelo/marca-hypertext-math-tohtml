/*
 * Copyright (C) 2017 Stefano D'Angelo <zanga.mail@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

module.exports = function (Marca) {
	Marca.DOMElementHypertextMathRoot.toKrotonProto =
		Marca.DOMElementMathRoot.toKrotonProto;
	Marca.DOMElementHypertextMathRoot.toHTML = function (indent, opt) {
		var k = Marca.DOMElementMathRoot.toKroton.call(this);
		var l = k.layout(opt.mathMetrics);
		var w = l.xMax - l.xMin;
		var h = l.yMax - l.yMin;
		var sc = opt.mathScale ? opt.mathScale : 16;
		var m = "mathMargin" in opt ? opt.mathMargin : 5;
		var m2 = m + m;
		var u = "mathUnits" in opt ? opt.mathUnits : "px";
		var s = (new Array(indent + 1)).join("  ")
			+ '<svg' + Marca.genericAttrsToHTML(this)
			+ ' viewBox="' + (sc * l.xMin - m)
			+ ' ' + (-sc * l.yMax - m)
			+ ' ' + (sc * w + m2) + ' ' + (sc * h + m2) + '"'
			// for old browsers
			+ ' width="' + (sc * w + m2) + '"'
			+ ' height="' + (sc * h + m2) + '"'
			+ ' style="font-size: ' + sc + u
			+ '; --viewbox-width: ' + (sc * w + m2) + u
			+ '; --viewbox-height:' + (sc * h + m2) + u
			+ '; --viewbox-margin:' + m + u
			+ '; --viewbox-xMin: ' + (sc * l.xMin) + u
			+ '; --viewbox-xMax: ' + (sc * l.xMax) + u
			+ '; --viewbox-yMin: ' + (sc * l.yMin) + u
			+ '; --viewbox-yMax: ' + (sc * l.yMax) + u
			+ '; --viewbox-xAdvanceMax: ' + (sc * l.xAdvanceMax) + u
			+ '; --viewbox-ascenderMax: ' + (sc * l.ascenderMax) + u
			+ '; --viewbox-descenderMin: ' + (sc * l.descenderMin)
			+ u + '">';
		if (Object.keys(this.definitions).length != 0) {
			s += '<defs>';
			for (var d in k.definitions)
				s += k.definitions[d].layout(opt.mathMetrics)
					.toSVG(opt.mathClassPrefix, sc);
			s += '</defs>';
		}
		return s + l.toSVG(opt.mathClassPrefix, sc) + '</svg>';
	};
};
