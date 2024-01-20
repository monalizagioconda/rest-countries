/*
    <p class="container para">text</p>
    const p = document.querySelector('p')
    console.log(p.className) // -> container para
    p.classList.toogle('para')
    console.log(p.className) // -> container
    p.classList.add('paragraph')
    console.log(p.className) // -> container paragraph
    p.classList.add('paragraph')
    console.log(p.className) // -> container paragraph
    p.classList.remove('container')
    console.log(p.className) // -> paragraph
    p.className = 'title medium'
    console.log(p.className) // -> 'title medium'
*/

class Element {

}

/**
 * Element prototype 
 */

const p = new Element('container para')

console.log(p.className) // -> container para
p.classList.toogle('para')
console.log(p.className) // -> container
p.classList.add('paragraph')
console.log(p.className) // -> container paragraph
p.classList.add('paragraph')
console.log(p.className) // -> container paragraph
p.classList.remove('container')
console.log(p.className) // -> paragraph
p.className = 'title medium'
console.log(p.className) // -> 'title medium'
