import { SceneManager } from './shared/scene-manager';
import { LoaderScene } from './scenes/loader-scene';
import { TRANSPARENT } from './shared/constants'; // or FILL_COLOR

SceneManager.init(TRANSPARENT);

const loady: LoaderScene = new LoaderScene();
SceneManager.changeScene(loady);
