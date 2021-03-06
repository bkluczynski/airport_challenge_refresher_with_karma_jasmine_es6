import {Airport} from './Airport'
import {Plane} from './Plane'
import {Weather} from './Weather'

describe("airport", function() {
    let airport;
    let plane;
    let weather;
    let newAirport;

    beforeEach(function() {
        airport = new Airport();
        plane = new Plane();
    })

    it("should be initialized with zero planes", function() {
        expect(airport.getPlanes()).toEqual(0);
    })

    it("should have a hangar storing planes", function() {
        expect(airport.planes).toBeDefined();
    })

    describe("airport is fully operational when the weather is good", function() {

        beforeEach(function() {
            spyOn(Math, 'random').and.returnValue(0);
            airport.requestPlaneToLand(plane);
        })

        it("should be able to land a plane at the airport", function() {
            expect(airport.getPlanes()).toEqual(1);
            expect(plane.isFlying()).toBe(false);
        })

        it("should be able to order a plane to takeoff", function() {
            airport.requestPlaneToTakeOff(plane);
            expect(airport.getPlanes()).toEqual(0);
            expect(plane.isFlying()).toBe(true);
        })

    })
    describe("airport does not allow to operate when it's bad weather", function() {
        it("prevents the landing when there is a bad weather", function() {
            spyOn(Math, 'random').and.returnValue(1);
            expect(function() {
                airport.requestPlaneToLand(plane);
            }).toThrowError("sorry, but you can't land due to bad weather");
        })
        it("prevents the take off when there is a bad weather", function() {
            spyOn(Math, 'random').and.returnValue(1);
            expect(function() {
                airport.requestPlaneToTakeOff(plane);
            }).toThrowError("sorry, but you can't take off due to bad weather")
        })
    })

    describe("airport storage", () => {
        it("has limited capacity", () => {
            expect(airport.capacity).toBeDefined()
        })
        it("has capacity of 20 planes", () => {
            expect(airport.capacity).toEqual(20)
        })
        it("prevents from landing when airport is full", () => {
            spyOn(Math, 'random').and.returnValue(0);
            let i = 0;
            while (i < 20) {
                airport.planes.push(plane)
                i++;
            }
            expect(() => {
                airport.requestPlaneToLand(plane)
            }).toThrowError("oh sorry, we can't land your plane at the moment, you have to divert to the nearest airport")

        })

        it("allows to change a default value of airport's capacity", () => {
          newAirport = new Airport(5)
          expect(newAirport.capacity).toEqual(5);
        })

    })

})
