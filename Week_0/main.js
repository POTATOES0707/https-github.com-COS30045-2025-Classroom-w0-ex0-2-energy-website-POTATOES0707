function showCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    document.getElementById('currentPage').innerText = `You are currently on: ${currentPage}`;
}
window.onload = showCurrentPage;
//Showing users what page they are on