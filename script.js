const inputArr = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0]
let svgDimension = 300
function waterArea (array, showWalls) {
    let leftMax = -1,
        rightMax = -1,
        left = 0,
        right = array.length - 1,
        water = 0;
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
    svg.setAttribute('height', `${svgDimension}px`)
    svg.setAttribute('width', `${svgDimension}px`)
    svg.setAttribute('viewBox', `0 0 ${svgDimension} ${svgDimension}`)
    // add border to svg
    svg.style.border = '1px solid black'
    svg.style.marginTop = '20px'
    document.getElementById('graph-container').appendChild(svg);

    while (left <= right) {
        //Get the max wall height from both the ends
        leftMax = array[left] > leftMax ? array[left] : leftMax
        rightMax = array[right] > rightMax ? array[right] : rightMax
        //calculate the amount of water trapped
        if (leftMax > rightMax) {
            water += rightMax - array[right]
            if(rightMax - array[right] > 0) {
                populateChart(array, rightMax - array[right],right,'water',svg)
            }
            else if(array[right] > 0 && showWalls) {
                    populateChart(array, array[right],right,'wall',svg)
                }
            right--
        }
        else {
            water += leftMax - array[left]
            if(leftMax - array[left] > 0) {
                populateChart(array, leftMax - array[left],left,'water',svg)
            }
            else if(array[left] > 0 && showWalls) {
                    populateChart(array, array[left],left,'wall',svg)
            }
            
            left++
        }
    }

    return water
};

//function to generate svg chart from left and right max heights
function populateChart(inputArr, material,index,color,svg) {

        let width = svgDimension / inputArr.length
        let paint = color === 'water' ? 'blue' : 'yellow'
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        let materialHeight = material * 30    
        bar.setAttribute('x', index * (svgDimension / inputArr.length))
        bar.setAttribute('y', svgDimension - materialHeight)
        bar.setAttribute('height', `${materialHeight}px`)
        bar.setAttribute('width', `${width}px`)
        bar.style.fill = paint
        bar.style.stroke = 'black'
        svg.appendChild(bar);
} 
waterArea(inputArr, true)
let totalWater = waterArea(inputArr, false)
let score = document.getElementById('score')
score.style.marginTop = '32px'
score.innerHTML = `Total water trapped: ${totalWater}`