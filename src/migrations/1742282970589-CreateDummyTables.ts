import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDummyTables1742282970589 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        for (let i = 1; i <= 400; i++) {
            await queryRunner.createTable(new Table({
                name: `dummy_table_${i}`,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }), true);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (let i = 1; i <= 400; i++) {
            await queryRunner.dropTable(`dummy_table_${i}`);
        }
    }
}
