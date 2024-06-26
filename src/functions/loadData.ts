/**
  * 获取给定 Github 存储库的星号计数。
  * @customfunction
  * @param {string} 用户名 Github 用户或组织的字符串名称。
  * @param {string} repoName Github 仓库的字符串名称。
  * @return {number} 给 Github 存储库的星数。
  */
export async function getStarCount(userName:string, repoName:string) {
    try {
      //您可以将此 URL 更改为要处理的任何 Web 请求。
      const url = "https://api.github.com/repos/" + userName + "/" + repoName;
      const response = await fetch(url);
      //预计状态代码在 200-299 范围内
      if (!response.ok) {
        throw new Error(response.statusText)
      }
        const jsonResponse = await response.json();
        return jsonResponse.watchers_count;
    }
    catch (error) {
      return error;
    }
  }