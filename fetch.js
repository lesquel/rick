(()=>{
    const create = ({element, clases, conten, atributos})=>{
        let e = document.createElement(element);
        if (clases) e.classList.add(clases);
        if (conten) e.innerHTML = conten;
        if (atributos) atributos.forEach(ele =>{
            e.setAttribute(ele.name, ele.value);
        });
        return e;
    }
    
    const f = async (peti)=>{
        document.querySelector(".carga").classList.add("cargaActivo")
        try{
            let r = await fetch(peti),
            j = await r.json()
            
            console.log(j.results[0])

            document.querySelector(".next").setAttribute("pag", j.info.next)
            document.querySelector(".prev").setAttribute("pag", j.info.prev)

            let fa = document.createDocumentFragment()

            
            j.results.forEach(e => {
                let col = create({
                    element : "div", clases : "col"
                })
                let card = create({
                    element : "div", clases : "card"
                })
                let img = create({
                    element : "img", clases : "card-img-top",atributos : [{name : "src" , value : e.image}]
                })
                let cardBody = create({
                    element : "div", clases : "card-body"
                })
                let h3 = create({
                    element : "h3", conten : e.name, clases : "card-title"
                })
                let cardText = create({
                    element : "p", clases : "card-text", conten : "lorem "
                })
                cardBody.appendChild(h3)
                cardBody.appendChild(cardText)
                card.appendChild(img)
                card.appendChild(cardBody)
                col.appendChild(card)
                fa.appendChild(col)
            });
            document.querySelector(".container").innerHTML = "<div class='pegar'></div>"
            document.querySelector(".pegar").appendChild(fa)
            
            setTimeout(()=> document.querySelector(".carga").classList.remove("cargaActivo"), 1000)
        }catch(err){
            console.log(err)
        }
        document.addEventListener("click", e =>{
            if (!e.target.matches(".prev") && !e.target.matches(".next")) return false;
            let i = 0;
            if (i == 0 && e.target.getAttribute("pag") != "null") f(e.target.getAttribute("pag"))
        })
    }
    f("https://rickandmortyapi.com/api/character")
})()
