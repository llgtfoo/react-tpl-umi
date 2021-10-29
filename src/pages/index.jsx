import styles from './index.less';
import * as router from './*/router.js';
console.log(router, 'router');
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <p>llgtfoo</p>
      <ul>
        <li>11</li>
        <li>22</li>
      </ul>
    </div>
  );
}
