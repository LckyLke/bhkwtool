import create from "zustand"
import BHKWStromKW from "../dataClasses/BHKWStromKW"

const useVerweiseStore = create(set => ({
    BHKWStromKW: {
        20: new BHKWStromKW(39,62,14100,9950,0.8),
        50: new BHKWStromKW(81,145,21000,12950,0.82),
        100: new BHKWStromKW(130, 271,25800, 17400, 1.34),
        140: new BHKWStromKW(207, 384, 30000, 20900, 1.72),
        199: new BHKWStromKW(263,538,39000,30000,2.95),
        238: new BHKWStromKW(363,667,44000,30500,2.57)
    }
}))

export default useVerweiseStore