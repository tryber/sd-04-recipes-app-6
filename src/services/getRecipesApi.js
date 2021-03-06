const getRecipesAPI = (URL) =>
  fetch(URL).then((response) =>
    response.json().then((json) => {
      if (response.ok) return Promise.resolve(json);
      return Promise.reject(json);
    }),
  );

export default getRecipesAPI;
