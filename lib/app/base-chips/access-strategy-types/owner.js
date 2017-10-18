"use strict";
const Promise = require("bluebird");

module.exports = {
    name: "owner",
    get_pre_aggregation_stage: function(context, params) {
        if (context.user_id) {
            return Promise.resolve([
                {
                    $match: {
                        "created_context.user_id": { $eq: context.user_id },
                    },
                },
            ]);
        } else {
            return Promise.resolve([{ $match: { _id: { $exists: false } } }]);
        }
    },
    checker_function: function(context, params, item) {
        if (
            context.user_id && context.user_id === item.created_context.user_id
        ) {
            return Promise.resolve();
        } else {
            return Promise.reject(
                "Only the owner of this resource can perform this operation on this item."
            );
        }
    },
    item_sensitive: true,
};