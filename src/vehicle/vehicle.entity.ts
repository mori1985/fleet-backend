import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'vehicles' }) // ⚡ حتما نام جدول با دیتابیس مطابقت داشته باشه
export class Vehicle {
  @PrimaryGeneratedColumn()
    id: number;

      @Column()
        name: string;

          @Column({ type: 'double precision' })
            lat: number;

              @Column({ type: 'double precision' })
                lng: number;

                  @Column()
                    status: string;

                      @Column({ type: 'float' })
                        distance: number;

                          @Column()
                            driver_name: string;

                              @Column()
                                driver_phone: string;

                                  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
                                    last_update: Date;
                                    }
                                    