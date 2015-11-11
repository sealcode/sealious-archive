var Sealious = require("sealious");

module.exports = {
	test_init: function() {
		var listable = new Sealious.ChipTypes.ResourceType({
		    name: "testable",
		})

	},

	test_start: function() {
		var field_type_reference = Sealious.ChipManager.get_chip("field_type", "reference");
		describe("FieldType.Reference", function() {
			it("checks if is_proper_declaration works correctly", function(done) {
				var declar = {
					"name": "string",
					"allowed_types": ["testable"]
				}
				try {
					field_type_reference.declaration.is_proper_declaration(declar)
					done();
				}
				catch (e) {
					done(new Error(e));
				}
			})
			it("checks if is_proper_declaration throws an error (non existing type)", function(done) {
				var declar = {
					"name": "string",
					"allowed_types": ["wrong_type"]
				}
				try {
					field_type_reference.declaration.is_proper_declaration(declar)
					done("It didn't throw an error");
				}
				catch (e) {
					if (e.type === "dev_error")
						done();
					else
						done(new Error(e));			

				}
			})
			it("checks if is_proper_declaration throws an error (wrong attribute)", function(done) {
				var declar = {
					"nam": "string",
					"allowed_types": ["testable"]
				}
				try {
					field_type_reference.declaration.is_proper_declaration(declar)
					done("It didn't throw an error");
				}
				catch (e) {
					if (e.type === "dev_error")
						done();
					else
						done(new Error(e));			

				}
			})
			it("checks if is_proper_value throws an error (no type in value argument)", function(done) {
				field_type_reference.is_proper_value(new Sealious.Context(), { allowed_types: ["testable"] }, {})
				.then(function() {
					done(new Error("It didn't throw an error"));
				})
				.catch(function(error){
					if(error.type === "validation")
						done();
					else 
						done(new Error(error));
				})
			})
			it("checks if is_proper_value throws an error (wrong type given in value argument)", function(done) {
				field_type_reference.is_proper_value(new Sealious.Context(), { allowed_types: ["testable"] }, {type: "testabl"})
				.then(function() {
					done(new Error("It didn't throw an error"));
				})
				.catch(function(error){
					if(error.type === "validation")
						done();
					else 
						done(new Error(error));
				})
			})
			/* TO DO
			it("checks if is_proper_value throws an error (wrong type given in value argument)", function(done) {
				field_type_reference.is_proper_value(new Sealious.Context(), { allowed_types: ["testable"] }, {type: "testable", data: 1})
				.then(function() {
					done();
				})
				.catch(function(error){
					if(error.type === "validation")
						done();
					else 
						done(new Error(error));
				})
			})
			*/
			it("checks if is_proper_value works corectly (value is not an object, not found given type)", function(done) {
				field_type_reference.is_proper_value(new Sealious.Context(), { allowed_types: ["testable"] }, "testable")
				.then(function(result) {
					done();
				})
				.catch(function(error){
					if(error.type === "validation")
						done();
					else 
						done(new Error(error));
				})
			})
		})
	}
}