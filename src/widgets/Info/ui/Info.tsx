import { Container } from '@/shared/ui/Container';

export function Info() {
  return (
    <section id="info" className="py-20 border-t border-white/5">
      <Container>
        <div className="flex flex-row justify-around items-center">

            <h3>Add the pair which you want to follow</h3>

            <img
              src="/images/add_pair.jpg"
              alt="PulseNotification app preview"
              className="w-xs h-auto"
            />

        </div>
        <div className="flex flex-row justify-around items-center">

            <img
              src="/images/add_pair.jpg"
              alt="PulseNotification app preview"
              className="w-xs h-auto"
            />

            <h3>Give push notifications for the pairs you follow</h3>

        </div>
      </Container>
    </section>
  );
}
