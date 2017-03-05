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
		var s = (new Array(indent + 1)).join("  ")
			+ '<svg' + Marca.genericAttrsToHTML(this)
			+ ' viewBox="' + l.xMin + ' ' + (-l.yMax)
			+ ' ' + w + ' ' + h + '"'
			// for old browsers
			+ ' width="' + w + '" height="' + h + '"'
			+ ' style="font-size: 1px; --viewbox-width: ' + w
			+ '; --viewbox-height:' + h
			+ '; --viewbox-xMin: ' + l.xMin
			+ '; --viewbox-xMax: ' + l.xMax
			+ '; --viewbox-yMin: ' + l.yMin
			+ '; --viewbox-yMax: ' + l.yMax
			+ '; --viewbox-xAdvanceMax: ' + l.xAdvanceMax + '">';
		if (Object.keys(this.definitions).length != 0) {
			s += '<defs>';
			for (var d in k.definitions)
				s += k.definitions[d].layout(opt.mathMetrics)
					.toSVG(opt.mathClassPrefix);
			s += '</defs>';
		}
		return s + l.toSVG(opt.mathClassPrefix) + '</svg>';
	};
};
