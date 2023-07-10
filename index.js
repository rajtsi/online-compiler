
        
        var editor=CodeMirror.fromTextArea(document.getElementById("editor"),{
            mode:"text/x-c++src",
            theme:"dracula",
            lineNumbers:true,
            autoCloseBrackets:true,
        })

        var width=window.innerWidth
        var input=document.getElementById("input")
        var output=document.getElementById("output")
        var run=document.getElementById("run")
        editor.setSize(0.7*width,"500")
        var option=document.getElementById("autoSizingSelect")
        option.addEventListener("change",function(){

            if(option.value=="Java")
            {
                editor.setOption("mode","text/x-java")
            }
            else if(option.value=="Python")
            {
                editor.setOption("mode","text/x-python")
            }
            else
            {
                editor.setOption("mode","text/x-c++src")
            }
        })
        
        var code;
        run.addEventListener("click",async function(){
            code={
                code:editor.getValue(),
                input:input.value,
                lang:option.value
            }

            var odata=await fetch("http://localhost:8000/compile",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(code)

            })
            var d=await odata.json()
            output.value=d.output
        })