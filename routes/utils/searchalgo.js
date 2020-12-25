return console.log(" the entire product after if statement")
let s = "a distracted dummy lorem obscure"
let title1  = "It is a long established fact that a reader will be distracted by the";
let title2  = "It is a long established fact that a reader will be distracted by the";
let title3  = "It is a long established fact that a reader will be distracted by the";
let titles = [
{title:"It is a long established fact that a reader will be distracted by the"},
{title:" simply dummy text of the printing and typesetting"},
{title:"and more recently with desktop publishing"},
{title:"Where does it come from?"},
{title:"The standard chunk of Lorem Ipsum used since the 1500s is"},
{title:"the more obscure Latin words, consectetur, from a Lorem Ipsum"},
]

let matches = []
s = s.split(" ")
for (let i = 0; i < s.length; i++) {
    const w1 = s[i];
    if (w1 !== " ") {
        for (let j = 0; j < titles.length; j++) {
            let title = titles[j].title;
            let oneMatch = []
            let arrtitle = title.split(" ")
            for (let r = 0; r < arrtitle.length; r++) {
                const w2 = arrtitle[r];
                if (w2 === s[i]) {
                    oneMatch.push(arrtitle[r])
                }
            }
            if (oneMatch.length === 2 || oneMatch.length > (parseInt(s.length) / 2) ) {
                matches.push(title)
            }
        }
    }
}

console.log(matches, " All the matches ")