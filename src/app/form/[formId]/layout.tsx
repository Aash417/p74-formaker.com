import Navbar from '@/components/navbar';

type Props = {
   children: React.ReactNode;
};

export default function Layout({ children }: Props) {
   return (
      <div>
         <Navbar />
         {children}
      </div>
   );
}
