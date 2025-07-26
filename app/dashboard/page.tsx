// import './layout.css'

// export default function DashboardPage() {
//     return (
//         <div className='dashboard-layout'>
//             <nav className='navbar'>

//             </nav>
//             <aside className='sidebar'>

//             </aside>
//             <section className='dashboard-content'>
//                 <div className='statistics-component'>
//                     <div></div>
//                 </div>
//                 <div className='mood-component'>
//                     <div></div>
//                 </div>
//                 <div className='calendar-component'>
//                     <div></div>
//                 </div>
//             </section>
//         </div>
//     );
//   }
  
import { Square } from 'lucide-react';
import './layout.css'
import { SquarePrompt } from '@/components/mood';
import PoopHeatmap from '@/components/PoopHeatmap';

export default function DashboardPage() {
    return (
        <div className='dashboard-layout'>
            <nav className='navbar'>
                {/* Ajoute ici le contenu de ta navbar */}
            </nav>
            <div className='main-area'>
                <aside className='sidebar'>
                    {/* Ajoute ici le contenu de ta sidebar */}
                </aside>
                <section className='dashboard-content'>
                    <div className='statistics-component'>
                        <div></div>
                    </div>
                    <div className='mood-component'>
                        <div>
                            <SquarePrompt initialAct="neutral" />
                        </div>
                    </div>
                    <div className='calendar-component'>
                        <div>
                            <PoopHeatmap />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}