
export const githubInfoLoader = async () => {
    const response = await fetch("https://api.github.com/users/akshay08k");
    return response.json();
};
