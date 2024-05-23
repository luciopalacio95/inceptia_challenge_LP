export default function formatDate(date:any) {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${day <= 9 ? "0"+day : day}.${month <= 9 ? "0"+month : month}.${year}`;
}