import 'bootstrap/dist/css/bootstrap.css'

export default function Header ({ title, subtitle }) {
    return (
        <header className="alert alert-info text-center">
            <h1 className="display-1">{title}</h1>
            <h2 className="display-2">{subtitle}</h2>
        </header>
    )
}