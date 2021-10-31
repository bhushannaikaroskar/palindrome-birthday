function reverseStr(text){
    const charList = text.split("");
    const reversedList = charList.reverse();
    const reverseStr = reversedList.join("");

    return reverseStr;
}

function checkPalindrome(str){
    const reverseString = reverseStr(str);
    if(reverseString === str){
        return true;
    }
    return false;
}

function convertDateToString(date){

    const dateStr = {
        day:"",
        month:"",
        year:""
    }

    if(date.day < 10){
        dateStr.day = "0" + date.day;
    }else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = "0" + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;

}


function getAllDateFormats(date){
    const dateStr = convertDateToString(date);

    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    const formatList = [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
    return formatList;
}

function checkPalindromeForAllFormat(date){

    const dateList = getAllDateFormats(date);
    const length = dateList.length;
     
    let isPalindrome = false;
    for(let i=0 ; i < length ; i++){
        if(checkPalindrome(dateList[i])){
            isPalindrome = true;
            break;
        }
    }

    return isPalindrome;

}

function isLeapYear(date){

    let year = date.year;

    if(year%400 == 0){
        return true;
    }
    if( year%100 == 0){
        return false;
    }

    if( year%4 == 0){
        return true;
    }

    return false;

}

function getNextDate(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month == 2){
        if(isLeapYear(date)){
            daysInMonth[1] = 29;
        }
    }

    if(day > daysInMonth[month-1]){
        day = 1;
        month++;
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date){
    let nextDate = getNextDate(date);
    let counter = 0;

    while(true){
        counter++;
        if(checkPalindromeForAllFormat(nextDate)){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [counter,nextDate];
}



const dateInput = document.querySelector("#dateInput");
const checkButton = document.querySelector("#checkButton");
const output = document.querySelector("#output");

function clickHandler(){
    const dateString = dateInput.value;
    if(dateString !== ""){
        const dateList = dateString.split("-");
        const year = dateList[0];
        const month = dateList[1];
        const day = dateList[2];

        const date = {
            day: Number(day),
            month: Number(month),
            year: Number(year)
        }

        if(checkPalindromeForAllFormat(date)){
            output.innerText = "Yay your birthday is palindrome.";
        }else{
            const [dayCount, nextPalindromeDate] = getNextPalindromeDate(date);
            const nextDateString = nextPalindromeDate.day+"-"+nextPalindromeDate.month+"-"+nextPalindromeDate.year;
            output.innerHTML = `The nearest palindrome date is ${nextDateString.bold()}. You missed by ${dayCount.toString().bold()} ${dayCount === 1?"day":"days"}`;
        }

    }
}

checkButton.addEventListener("click",clickHandler);
