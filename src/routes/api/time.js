export const post = async (request) => {
	const formBody = JSON.parse(request.body);
	console.log(formBody);

	// const title = formBody.title;

	// const sandboxId = await createSandboxId(codeQuestion, codeAnswer);
	// add that card to svelte store
	// createNewCard(question, answer, sandboxId);
	// return a successfully created message
	return {
		body: {
			// title,
			// question,
			// sandboxId,
			// codeQuestion,
			// codeAnswer
		}
	};
};
