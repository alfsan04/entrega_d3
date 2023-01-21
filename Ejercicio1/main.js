

const width = 800
const height = 600
const margin ={
    top: 10,
    bottom: 100,
    left: 40,
    right: 10
}

const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

/*const sliderGroup = svg.append("g")
   .attr("id", "sliderGroup")
   .attr("transform", "translate(20, 560)")

const slider = sliderGroup.append("input")
    .attr("type", "range")
    .attr("min", 1930)
    .attr("max", 2022)
    .attr("value", 1930)
    .attr("id", "mySlider")

function getInitialValue() {
    return d3.select("#mySlider").property("value")
}*/

const x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.1)
const y = d3.scaleLinear().range([height - margin.bottom - margin.top, 0])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

var value = 2023
console.log(value)

d3.select("#mySlider").on("change", function(){
    value = d3.select(this).property("value")
})

d3.csv("WorldCup.csv").then(data => {

    data.map(d => {
        d.Year = +d.Year
    })

    console.log(data)
    console.log(value)
    const data2 = data.filter(d => d.Year < value)
    console.log(data2)

    const xLabel = elementGroup.append("text").attr("class", "texto").text("Países")
        .attr("transform", `translate(${width - margin.right - 45}, ${height - margin.bottom + 30})`)
        .attr("text-anchor", "end")
    
    const yLabel = elementGroup.append("text").attr("class", "texto").text("Títulos")
        .attr("transform", `translate(${-20}, ${70}) rotate(-90)`)

    let nest = d3.nest()
        .key(d => d.Winner)
        .entries(data2)

    function ordenar(a, b){
        if(a.values.length > b.values.length) {
            return -1
        } else {
            return 1
        }
    }
    
    nest.sort(ordenar)

    console.log(nest)

    x.domain(nest.map(d => d.key))
    y.domain([parseInt(0), parseInt(d3.max(nest.map(d => d.values.length)))])
    yAxis.ticks(d3.max(nest.map(d => d.values.length)))

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    let elements = elementGroup.selectAll("rect").data(nest)
    elements.enter().append("rect")
        .attr("class", d => d.key)
        .attr("x", d => x(d.key))
        .attr("y", d => y(d.values.length))
        .attr("width", x.bandwidth)
        .attr("height", d => height - margin.top - margin.bottom - y(d.values.length))
})

