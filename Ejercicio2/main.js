const width = 800
const height = 600
const margin ={
    top: 10,
    bottom: 100,
    left: 40,
    right: 10
}
var edad_leo = 1974

const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleLinear().range([0, width - margin.left - margin.right])
const y = d3.scaleLinear().range([height - margin.bottom - margin.top, 0])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

d3.csv("data.csv").then(data => {

    data.map(d => {
        d.year = +d.year
        d.age = +d.age
    })

    console.log(data)

    const xLabel = elementGroup.append("text").attr("class", "texto").text("Novias")
        .attr("transform", `translate(${width - margin.right - 35}, ${height - margin.bottom + 20})`)
        .attr("text-anchor", "end")
    
    const yLabel = elementGroup.append("text").attr("class", "texto").text("Edad")
        .attr("transform", `translate(${-25}, ${40}) rotate(-90)`)

    x.domain([0, data.length + 1])
    y.domain([0, (d3.max(data.map(d => d.year)) - edad_leo)])

    xAxis.ticks(data.length)
    yAxis.ticks((d3.max(data.map(d => d.year)) - edad_leo))
    

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    
    let novias = elementGroup.selectAll("rect").data(data)
    novias.enter().append("rect")
        .attr("class", d => d.name)
        .attr("x", d => x(data.indexOf(d) + 1) - 15)
        .attr("y", d => y(d.age))
        .attr("width", 30)
        .attr("height", d => height - margin.top - margin.bottom - y(d.age))

    let leo = elementGroup.selectAll("rect2").data(data)
    leo.enter().append("rect")
        .attr("class", "Leo")
        .attr("x", d => x(data.indexOf(d) + 1) -5)
        .attr("y", d => y(d.year - edad_leo))
        .attr("width", 10)
        .attr("height", 10)
        
})