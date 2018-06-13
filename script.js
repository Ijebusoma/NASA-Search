function init(){
 
    const button = document.querySelector('#search');
    button.addEventListener('click', function(){
    const div = document.getElementsByClassName('.main');
  /// div.style.visibility = 'hidden';
      
     //var hide = function (elem) {
       // elem.style.display = 'none';
    //};
    //hide(div)
   // alert('stuff');
        const input = document.querySelector('#name').value;
        (input == '') ? alert('Please enter a value'): getImage(input);//validate input
        
    });
 }
  // https://images-api.nasa.gov/search?q=sun&media_type=image
function getImage(name){
   
   const query_string = "https://images-api.nasa.gov/search?q="+name + "&media_type=image";
    fetch(query_string)

    .then(response => {
        var response_type = response.headers.get('Content-Type');
        if(response.status == '200'){
            
            if(response_type && response_type.includes('application/json')) {
                return response.json();
                }else{
                    throw new TypeError('The response does not contain json');
                }
                
            }else{
                handleError(response.status);
            }
            
})
    .then(result =>{
        displayImage(result);
        

    });
}

const displayImage = (result) => {
    //format and display json
    //alert('trying to display...');
        const i = document.getElementById('image');
        const href = document.querySelector('a');
        //href.setAttribute('href','');
        i.setAttribute('src', result.collection.items[1].links[0].href + ' ');
        
        i.setAttribute('width', '200px');
        i.setAttribute('height', '200px');
        document.querySelector('p').innerHTML = result.collection.items[1].data[0].description + ' ';
        //textContent = result.collection.items[1].links[0].href + ' ';
       // p.innerHTML = result.collection.items[1].links[0].href + ' ';
    
}
 const createError = (msg) => {throw new Error(msg)};

const handleError = (code) => {
    const message = {
      '400' : 'Resource not found',
      '500' : 'Server error'
    };
   error[code] === undefined ?
      createError('Something just happened right now :P') :
      createError(message[code]);
}
