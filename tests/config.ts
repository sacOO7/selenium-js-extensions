import Dict = NodeJS.Dict;

type CypressKitchenSink = {
    querying : string;
    actions : string;
    assertions : string;
}

export let cypressKitchenSinkUrls : CypressKitchenSink = {
    querying: "https://example.cypress.io/commands/querying",
    actions : "https://example.cypress.io/commands/actions",
    assertions: "https://example.cypress.io/commands/assertions"
}
