const Context = require.main.require("lib/context.js");
const field_type_text = require.main.require("lib/base-chips/field-types/text.js");
const acceptCorrectly = require.main.require("tests/util/accept-correctly.js");
const rejectCorrectly = require.main.require("tests/util/reject-correctly.js");
const assert_no_error = require.main.require("tests/util/assert-no-error.js");

const assert = require("assert");

describe("FieldType.Text", function(){
	it("returns the name of the field type", function() {
		assert.strictEqual(field_type_text.name, "text");
	});
	it("returns the description of the field type", function(){
		assert.strictEqual(typeof field_type_text.get_description(new Context(), {max_length: 10}), "string");
	});
	it("checks if is_proper_value works correctly", function(done){
		const {accept, reject} = acceptCorrectly(done);
		field_type_text.is_proper_value(accept, reject, new Context(), {}, 2);
	});
	it("checks if is_proper_value works correctly", function(done){
		const {accept, reject} = acceptCorrectly(done);
		field_type_text.is_proper_value(accept, reject, new Context(), {max_length: 5}, "123");
	});
	it("checks if is_proper_value works correctly", function(done){
		const {accept, reject} = rejectCorrectly(done);
		field_type_text.is_proper_value(accept, reject, new Context(), {max_length: 5}, "asdfghjkl");
	});
	it("checks if encode works properly (sanitizes html)", function(done){
		field_type_text.encode(new Context(), {strip_html: true}, "outside<script>alert(\"a\")</script>")
		.then(function(result){
			assert.strictEqual(result, "outside");
			done();
		}).catch(function(error){
			done(new Error(error));
		})
	});
	it("resolved with null when value_in_code is null", function(done){
		field_type_text.encode(new Context(), {}, null)
		.then(function(result){
			assert.strictEqual(result, null);
			done();
		})
		.catch(function(error){
			done(new Error(error));
		})
	})
	it("checks if encode works properly", function(done){
		const result = field_type_text.encode(new Context(), {}, {});
		assert_no_error(result, done);
	});
});