function StorageAvailable(type)
{
    try
    {
        var storage = window[type],
        x = '__storage_test__';
        storage.setItem (x,x);
        storage.removeItem(x);
        return true;
    }
    catch(e)
    {
        return false;
        
    }
}

function SavedScores()
{
    highScore = localStorage.getItem('HighScore');
    console.log(highScore);
}