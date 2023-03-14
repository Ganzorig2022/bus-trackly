import {atom} from 'recoil';

interface LocationState {
  longitude: number;
  latitude: number;
}

const defaultState: LocationState = {
  longitude: 106.915,
  latitude: 47.9171,
};

export const LocationCoordState = atom<LocationState>({
  key: 'locationCoordinateState',
  default: defaultState,
});
