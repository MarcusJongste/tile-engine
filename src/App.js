import Engine from './hexagon-engine/engine/components/Engine';

function App() {
    return <div style={{
        position: 'absolute',
        width: 1200,
        height: 600,
        left: 50,
        top: 50,
        overflow:"hidden",
    }}>
        < Engine ></ Engine>
    </div> 
}

export default App;
