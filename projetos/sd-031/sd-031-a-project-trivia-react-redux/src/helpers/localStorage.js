export function saveTokenStorage(token) {
  localStorage.setItem('token', token);
}

export function removeTokenStorage() {
  localStorage.removeItem('token');
}

export function addPlayerToRanking(player) {
  const ranking = localStorage.getItem('ranking')
    ? JSON.parse(localStorage.getItem('ranking')) : [];
  ranking.push(player);
  localStorage.setItem('ranking', JSON.stringify(ranking));
}

export function getRanking() {
  const ranking = localStorage.getItem('ranking')
    ? JSON.parse(localStorage.getItem('ranking')) : [];
  return ranking;
}
