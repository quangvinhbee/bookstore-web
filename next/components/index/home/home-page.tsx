import { SessionBanner } from './components/session-banner'
import { SessionListBok } from './components/session-list-book'
export function HomePage() {
    return (
        <div className="">
            <SessionBanner />
            <SessionListBok />
        </div>
    )
}
