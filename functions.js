const kmDistance = window.utils.getKmDistance

// 1. GET NEIGHBORS
// Return an array of directly connected city names for a given city.
const getNeighbors = cityName => {
    const neighbors = []

    for (const flight of graph.flights) {
        if (flight[0] === cityName) neighbors.push(flight[1])
        if (flight[1] === cityName) neighbors.push(flight[0])
    }

    return neighbors
}

// 2. MILEAGE
// Return fuel used in liters as an integer for a distance in km, with kmPerLiter representing the distance you can travel on one liter of fuel. Round to the nearest integer.
const kmPerLiter = 3
const getFuelConsumptionLiters = distanceKm => {
    return Math.round(distanceKm / kmPerLiter)
}

// 3. DIRECT FLIGHT
// Return true if two cities have a direct flight between them.
const hasDirectFlight = (city1, city2) => {
    return getNeighbors(city1).includes(city2)
}

// 4. JUST ONE TRANSFER
// Return true if city2 can be reached from city1 with one transfer or less.
const hasOneTransferRoute = (city1, city2) => {
    if (hasDirectFlight(city1, city2)) return true

    const neighbors = getNeighbors(city1)

    for (const neighbor of neighbors) {
        if (hasDirectFlight(neighbor, city2)) return true
    }

    return false
}

// 5. COUNT ALL CITIES
// Traverse from one city to count what total number of cities are reachable on the graph.
const countAllCities = city => {}

// 6. PATH DISTANCE
// Add up the full distance in km of a path like ["Montreal", "Atlanta", "Guadalajara"].
const getPathDistance = path => {}

// 7. PATH FUEL CONSUMPTION
// Find the fuel used for a path (like ["Montreal", "Atlanta", "Guadalajara"]) in liters. Remember you can call the previous functions in this file as helpers.
const getPathFuelConsumption = path => {}

// 8. FEWEST TRANSFERS
// Find the path from one city to another that requires the fewest transfers. Return an array of 3-letter airport codes.
const getFewestTransfersPath = (startCity, endCity) => {}

// 9. SHORTEST PATH
// Find the shortest-distance path and return an array of 3-letter airport codes.
const getShortestDistancePath = (startCity, endCity) => {}

// 10. FIND HUB CITY
// Return the name of the airport with the most direct connections.
const findHubCity = () => {}

window.getNeighbors = getNeighbors
window.getFuelConsumptionLiters = getFuelConsumptionLiters
window.hasDirectFlight = hasDirectFlight
window.hasOneTransferRoute = hasOneTransferRoute
window.countAllCities = countAllCities
window.getPathDistance = getPathDistance
window.getPathFuelConsumption = getPathFuelConsumption
window.getFewestTransfersPath = getFewestTransfersPath
window.getShortestDistancePath = getShortestDistancePath
window.findHubCity = findHubCity