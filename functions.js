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
const countAllCities = city => {
    const stack = [city]
    const visited = {}
    let count = 0

    while (stack.length > 0) {
        const currentCity = stack.pop()
        if (!visited[currentCity]) {
            visited[currentCity] = true
            count++
        }
        for (const neighbor of getNeighbors(currentCity)) {
            if (!visited[neighbor]) {
                stack.push(neighbor)
            }
        }
    }

    return count
}

// 6. PATH DISTANCE
// Add up the full distance in km of a path like ["Montreal", "Atlanta", "Guadalajara"].
const getPathDistance = path => {
    let totalDistance = 0

    for (let i=0; i<path.length - 1; i++) {
        totalDistance += getKmDistance(path[i], path[i+1])
    }

    return totalDistance
}

// 7. PATH FUEL CONSUMPTION
// Find the fuel used for a path (like ["Montreal", "Atlanta", "Guadalajara"]) in liters. Remember you can call the previous functions in this file as helpers.
const getPathFuelConsumption = path => {
    return getFuelConsumptionLiters(getPathDistance(path))
}

// 8. FEWEST TRANSFERS
// Find the path from one city to another that requires the fewest transfers. Return an array of 3-letter airport codes.
const getFewestTransfersPath = (startCity, endCity) => {
    const queue = [startCity]
    const visited = {}
    const previous = {}
    visited[startCity] = true

    while (queue.length > 0) {
        const currentCity = queue.shift()
        if (currentCity === endCity) break

        for (const nextCity of getNeighbors(currentCity)) {
            if (!visited[nextCity]) {
                visited[nextCity] = true
                previous[nextCity] = currentCity
                queue.push(nextCity)
            }
        }
    }

    if (!visited[endCity]) return []

    const path = []
    let city = endCity

    while (city) {
        path.unshift(getCityFromGraph(city).code) 
        if (city === startCity) break
        city = previous[city]
    }

    return path
}

// 9. SHORTEST PATH
// Find the shortest-distance path and return an array of 3-letter airport codes.
// (Djikstra Algorithm)
const getShortestDistancePath = (startCity, endCity) => {
    const distances = {}
    const previous = {}
    const unvisited = []

    for (const city of Object.keys(graph.cities)) {
        distances[city] = Infinity
        unvisited.push(city)
    }

    distances[startCity] = 0

    while (unvisited.length > 0) {
        let bestCity = null
        let bestDistance = Infinity

        for (const city of unvisited) {
            if (distance[city] > bestDistance) {
                bestCity = city
                bestDistance = distance[city]
            }
        }

        if (bestCity === null) break

        unvisited.splice(unvisited.indexOf(bestCity), 1)
        if (bestCity === endCity) break

        for (const neighbor of getNeighbors(bestCity)) {
            const newDistance = distances[bestCity] + kmDistance(bestCity, neighbor)

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance
                previous[neighbor] = bestCity
            }
        }
    }

    const path = []
    let currentCity = endCity

    while (currentCity) {
        path.unshift(getCityFromGraph(currentCity).code)
        if (currentCity === startCity) break
        currentCity = previous[currentCity]
    }

    return path
}

// 10. FIND HUB CITY
// Return the name of the airport with the most direct connections.
const findHubCity = () => {
    const hash = {}

    Object.values(graph.cities).forEach(city => hash[city.city] = getNeighbors(city.city).length)
    const hubCity = Object.keys(hash).reduce((a,b) => hash[a] > hash[b] ? a : b)

    return getCityFromGraph(hubCity).airport
}


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