# My literature review

I examine returnable packaging, offline collaboration, invariants and reliable event handling. This project-oriented review uses eight scientific publications and four technical sources. Five scientific publications date from 2023-2024; I retain three older works as foundations. I do not claim a systematic search protocol or that the papers prove my implementation correct. Full-text review and university citation formatting remain review tasks; S06 is used only at the level of its accessible description.

## Critical analysis

| Source | Relevant finding or approach                                                   | Limitation and my design implication                                                              |
| ------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| S01    | Reusable-packaging sustainability depends on how the overall system operates   | I need movement evidence; tracking software alone does not demonstrate environmental benefit      |
| S02    | Comparisons of disposable and reusable packaging depend on study conditions    | I must state evaluation boundaries and avoid transferring unrelated savings                       |
| S03    | Returnable transport-item management has established decision-support models   | I separate recording facts from future logistics optimization                                     |
| S04    | CRDT approaches provide principled deterministic convergence                   | Convergence alone does not establish the physical correctness of incompatible movements           |
| S05    | LoRe studies local-first invariants and selective coordination                 | Its verification guarantees do not transfer to my code; I need explicit invariants and checks     |
| S06    | Synql studies relational replication with integrity constraints                | Database merge is not itself a business decision about conflicting observations                   |
| S07    | Coordination avoidance depends on invariant confluence                         | I must assess whether a proposed operation can safely proceed independently                       |
| S08    | Local-first emphasizes local ownership and offline usability                   | A server API alone does not implement a local queue or reliable client persistence                |
| O01    | EPCIS defines interoperable visibility events                                  | Similar field names do not establish EPCIS compliance; compatibility is outside the initial scope |
| O02    | IndexedDB provides transactional client storage                                | It does not supply server synchronization or prevent user-driven storage deletion                 |
| O03    | Broker publication and consumer acknowledgements cover distinct delivery steps | A future message transport still needs a duplicate-handling design                                |
| O04    | PostgreSQL provides row and advisory locks                                     | Locks impose contention and must be used with a defined transaction strategy                      |

I use this evidence to motivate an auditable accounting protocol and a separate Identity foundation. My present Auth code implements neither the offline client nor the future business reconciliation. Those capabilities need their own implementation and experiments.

## Scientific publications

1. **S01.** Bradley C. G., Corsini L. (2023). _A literature review and analytical framework of the sustainability of reusable packaging_. Sustainable Production and Consumption 37, 126-141. [DOI](https://doi.org/10.1016/j.spc.2023.02.009).
2. **S02.** Pålsson H., Olsson J. (2023). _Current state and research directions for disposable versus reusable packaging: A systematic literature review of comparative studies_. Packaging Technology and Science 36(6), 391-409. [DOI](https://doi.org/10.1002/pts.2722).
3. **S03.** Glock C. H. (2017). _Decision support models for managing returnable transport items in supply chains: A systematic literature review_. International Journal of Production Economics 183, 561-569. [DOI](https://doi.org/10.1016/j.ijpe.2016.02.015).
4. **S04.** Almeida P. S. (2024). _Approaches to Conflict-free Replicated Data Types_. ACM Computing Surveys. [DOI](https://doi.org/10.1145/3695249), [author version](https://arxiv.org/abs/2310.18220v2).
5. **S05.** Haas J., Mogk R., Yanakieva E., Bieniusa A., Mezini M. (2024). _LoRe: A Programming Model for Verifiably Safe Local-First Software_. ACM TOPLAS 46(1), Article 2. [DOI](https://doi.org/10.1145/3633769), [preprint](https://arxiv.org/abs/2304.07133).
6. **S06.** Ignat C.-L., Elvinger V., Ba H. (2024). _Synql: A CRDT-Based Approach for Replicated Relational Databases with Integrity Constraints_. DAIS 2024, LNCS 14677, 18-35. [Publisher](https://link.springer.com/chapter/10.1007/978-3-031-62638-8_2).
7. **S07.** Bailis P., Fekete A., Franklin M. J., Ghodsi A., Hellerstein J. M., Stoica I. (2014). _Coordination Avoidance in Database Systems_. PVLDB 8(3), 185-196. [Full text](https://www.vldb.org/pvldb/vol8/p185-bailis.pdf).
8. **S08.** Kleppmann M., Wiggins A., van Hardenberg P., McGranaghan M. (2019). _Local-first software: You own your data, in spite of the cloud_. Onward! 2019, 154-178. [Author version](https://martin.kleppmann.com/papers/local-first.pdf).

## Standards and official documentation

9. **O01.** GS1, [EPCIS 2.0](https://ref.gs1.org/standards/epcis/2.0.0/), 2022.
10. **O02.** W3C, [Indexed Database API](https://www.w3.org/TR/IndexedDB/).
11. **O03.** RabbitMQ, [Consumer Acknowledgements and Publisher Confirms](https://www.rabbitmq.com/docs/confirms).
12. **O04.** PostgreSQL 17, [Explicit Locking](https://www.postgresql.org/docs/17/explicit-locking.html).
